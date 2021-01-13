import {Router} from "express";
import UserController from "../controllers/UserController";
import AdminController from "../controllers/AdminController";
import JWT from "../utils/JWT";
import Authorization from "../utils/Authorization";
import ProductController from "../controllers/ProductController";
import ShoppingBangController from "../controllers/ShoppingBagController";
import CategoryController from "../controllers/CategoryController";


class Routes {
    router:Router = Router()

    constructor() {
        this.config()
    }

    config():void{
        this.router.post("/user", UserController.createUser)
        this.router.post("/login",UserController.login)

        //Admin
        this.router.get("/admin/products",JWT.validate_token,AdminController.getProduct)
        this.router.post("/admin/products",JWT.validate_token,AdminController.addProduct)
        this.router.put("/admin/products/:id",JWT.validate_token,AdminController.updateProduct)
        this.router.delete("/admin/products/:id",JWT.validate_token, AdminController.deleteProduct)

        this.router.get("/products", ProductController.getAll)

        this.router.post("/bag/add", JWT.validate_token, ShoppingBangController.addToCart)
        this.router.get("/bag",JWT.validate_token, ShoppingBangController.getShoppingBag)

        //Category
        this.router.get("/categories",CategoryController.getAll)
    }
}
const routes = new Routes();
export default routes.router;
