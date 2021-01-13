import {Request, Response} from "express";
import {Category} from "../models/Category";

class CategoryController {
    getAll(req:Request,res:Response){
        Category.findAll().then((categories) => {
            res.status(200).json({
                "message":"Categories",
                "data":categories
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                "message":"Internal Server Error"
            })
        })
    }
}

export default new CategoryController();
