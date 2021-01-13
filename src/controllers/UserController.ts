import {Request, Response} from "express";
import {UserInterface} from "../interfaces/UserInterface";
import {User} from "../models/User";
import JWT from "../utils/JWT";
const bcrypt = require('bcrypt');


class UserController {

    async createUser(req:Request, res:Response){

        let user:UserInterface = req.body

        try {
            //@ts-ignore
            let existUser = await User.findOne({where:{"username":user.username}})

            if( existUser != null){
                res.status(400).json({
                    "message":"Username has been registered"
                })
                return;
            }

            user.password = await bcrypt.hash(user.password, 10)

            let newUser = User.build(user)
            await newUser.save();

            res.status(201).json({
                "message":"User Created Successful"
            });

        }catch (e){
            console.log(e)
            res.status(500).json({
                "message":"An error"
            })
        }
    }

    async login(req:Request, res:Response){
        let {username,password} = req.body;
        let existUser = await User.findOne({where:{"username":username}})

        if (existUser == null){
            res.status(404).json({
                "message":"username or password incorrect"
            })
        }else{
            let user:UserInterface = existUser.get();

            let match = await bcrypt.compare(password, user.password);
            console.log(match)

            if (match){

                let token = JWT.create_token(user);

                res.status(200).json({
                    "message":"Login Successful",
                    token
                })
            }else {
                res.status(500).json({
                    "message":"username or password incorrect"
                })
            }
        }
    }


}

export default new UserController();
