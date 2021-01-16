import {Request, Response} from "express";
import {ShoppingBagInterface} from "../interfaces/ShoppingBagInterface";
import Product from "../models/Product";

import {ProductInterface} from "../interfaces/ProductInterface";
import ShoppingBag from "../models/ShoppingBag";
import Authorization from "../utils/Authorization";
import {Category} from "../models/Category";

class ShoppingBagController {
    async addToCart(req:any,res:Response){

        if(!Authorization.isClient(req.current)){
            res.status(401).json({
                "message":"Operation not valid"
            })
            return
        }

        let product = await Product.findByPk(req.body.product_id)

        if(product == null){
            return
        }

        if(product.get().quantity <= 0){
            res.status(400).json({
                "message":"No hay inventario suficente"
            })

            return;
        }
        let bag:ShoppingBagInterface = req.body;

        bag.user_id = req.current.id;
        console.log(bag)
        try {
            let new_bag;
            // @ts-ignore
            let existBag = await ShoppingBag.findOne({where:{product_id:bag.product_id}})

            if(existBag == null){
                new_bag = await ShoppingBag.build(bag).save()

                product.get().quantity = parseInt(product.get().quantity) - bag.quantity

                await Product.update(product.get(),{where:{id:product.get().id}})

            }else {
                let id = existBag.get().id
                let old_q = bag.quantity

                bag.quantity = parseInt(existBag.get().quantity) + bag.quantity;

                await ShoppingBag.update(bag,{where:{id:id}})
                console.log(product.get().quantity, bag.quantity)

                product.get().quantity = parseInt(product.get().quantity) - old_q

                await Product.update(product.get(),{where:{id:product.get().id}})

                new_bag = await ShoppingBag.findOne({where:{id:id}})

            }

            res.status(201).json({
                "message":"Saved",
                "data":new_bag
            });

        }catch (e){
            console.log(e)
            res.status(500).json({
                "message":"Internal Server Error"
            })
        }
    }

    async getShoppingBag(req:any,res:Response) {

        if (!Authorization.isClient(req.current)) {
            res.status(401).json({
                "message": "Operation not valid"
            })
            return
        }

        let {id} = req.current

        let shopping_bag = await ShoppingBag.findAll({where:{user_id:id}, include:[Product],attributes:["id","quantity"]})

        res.status(200).json({
            "message":"Bag",
            "data":shopping_bag
        })

    }

    async emptyShoppingCart(req:any, res:Response){
        if (!Authorization.isClient(req.current)) {
            res.status(401).json({
                "message": "Operation not valid"
            })
            return
        }

        let user_id = req.current.id;
        console.log(user_id)

        try {
            await ShoppingBag.destroy({where:{user_id:user_id}})

            res.status(200).json({
                "message":"Cart Empty"
            })

        }catch (e){
            console.log(e)
            res.status(500).json({
                "message":"Error"
            })
        }
    }

    async updateCart(req:any,res:Response){
        if (!Authorization.isClient(req.current)) {
            res.status(401).json({
                "message": "Operation not valid"
            })
            return
        }

        res.json()

    }


}

export default new ShoppingBagController();
