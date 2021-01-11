import {Router} from "express";
import UserController from "../controllers/UserController";
import AdminController from "../controllers/AdminController";
import JWT from "../utils/JWT";
import Authorization from "../utils/Authorization";


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
    }
}
const routes = new Routes();
export default routes.router;
