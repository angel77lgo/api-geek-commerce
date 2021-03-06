import e, {NextFunction, Response} from "express";
import moment from "moment"
const jwt = require('jsonwebtoken');
require('dotenv').config()

class JWT {

    create_token(data: any) {
        let secret = process.env.SECRET;
        data.password = ""
        return jwt.sign(data, secret, {expiresIn: 60 * 60 * 48});
    }

    validate_token(req: any, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            res.status(401).json({
                "message": "Not Logged"
            })
        } else {
            let token = req.headers.authorization;
            // console.log("TOKEN", token)
            let payload;
            try {
                payload = jwt.verify(token, process.env.SECRET)

            } catch (e) {
                res.status(500).json({
                    "message":"Token Expired"
                })
                return;
            }
            req.current = payload;
            next();
        }
    }

}

export default new JWT();
