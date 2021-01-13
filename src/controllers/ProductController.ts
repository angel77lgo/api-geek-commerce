import {Request, Response} from "express";
import Product from "../models/Product";
import {Category} from "../models/Category";

class ProductController {

    async getAll(req:Request, res:Response){
        let product = await Product.findAll({include:Category,order:["id"]})
        res.status(200).json({
            "message":"All Products",
            "data":product
        })
    }

}
export default new ProductController();
