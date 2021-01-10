import {Request, Response} from "express";
import Authorization from "../utils/Authorization";
import Product from "../models/Product";
import {ProductInterface} from "../interfaces/ProductInterface";

class AdminController {
    async addProduct(req:any, res: Response){
        let is_admin = Authorization.isAdmin(req.current)

        if(!is_admin){
            res.status(401).json({
                "message":"No have permission"
            })
            return;
        }
        let product:ProductInterface = req.body;

        console.log(product)
        try {
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

    async getProduct(req:Request, res:Response) {

        let is_admin = Authorization.isAdmin(req.body)


        if(!is_admin){
            res.status(401).json({
                "message":"No have permission"
            })
            return;
        }

        let products = await Product.findAll()

        res.json({
            "message":"products",
            "data":products
        })

    }
}

export default new AdminController();