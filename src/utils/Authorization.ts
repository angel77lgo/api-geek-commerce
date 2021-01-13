import {NextFunction, Response} from "express";
import {UserInterface} from "../interfaces/UserInterface";

class Authorization {

    isAdmin(req:any) {

        return req.role_type == "admin";
    }

    isClient(req:any){
        return req.role_type == "client"
    }
}
export default new Authorization();
