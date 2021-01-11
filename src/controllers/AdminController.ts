import {Request, Response} from "express";
import Authorization from "../utils/Authorization";
import Product from "../models/Product";
import {ProductInterface} from "../interfaces/ProductInterface";
import {Category} from "../models/Category";
import {where} from "sequelize";

class AdminController {
    async addProduct(req:any, res: Response){
        let is_admin = Authorization.isAdmin(req.current)

        if(!is_admin){
            res.status(401).json({
                "message":"No have permission"
            })
            return;
        }
        let {filename} = req.file
        let product:ProductInterface = req.body;

        console.log(product.short_name)
        try {
            product.image_url = req.protocol + '://' + req.get('host') + "/images/" + filename
            let new_product = Product.build(product)

            console.log(new_product)
            let saved = await new_product.save()
            res.status(201).json({
                "message":"Product Add Successful",
                "data":saved
            })
        }
        catch (e){
            console.log(e)
            res.status(500).json({
                "message":"An error ocurred"
            })
        }


    }

    async getProduct(req:any, res:Response) {

        let is_admin = Authorization.isAdmin(req.current)

        if(!is_admin){
            res.status(401).json({
                "message":"No have permission"
            })
            return;
        }

        let products = await Product.findAll({include:Category,order:['id']})


        res.json({
            "message":"products",
            "data":products
        })

    }

    async updateProduct (req:any,res:Response){
        let is_admin = Authorization.isAdmin(req.current)

        if(!is_admin){
            res.status(401).json({
                "message":"No have permission"
            })
            return;
        }

        let {id} = req.params;
        console.log(id)
        try {
            let product = await Product.findByPk(id);

            if(product == null){
                res.status(404).json({
                    "message":"Product not found"
                })
                return;
            }
            let newProduct:ProductInterface = req.body
            await Product.update(newProduct,{where:{id:id}})

            res.status(200).json({
                "message":"Product Updated"
            })

        }catch (e){
            console.log(e);
            res.status(500)
        }

    }

    async deleteProduct(req:any, res:Response){

        let {id} = req.params;

        try {
            let product = await Product.findByPk(id);

            if(product == null){
                res.status(404).json({
                    "message":"Product not found"
                })
                return;
            }
            let newProduct:ProductInterface = req.body
            await Product.destroy({where:{id:id}})

            res.status(200).json({
                "message":"Product Deleted"
            })

        }catch (e){
            console.log(e);
            res.status(500).json({
                "message":"An error Ocurred"
            })
        }
    }

}

export default new AdminController();
