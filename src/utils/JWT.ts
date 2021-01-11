import e, {NextFunction, Response} from "express";
import moment from "moment"
const jwt = require('jsonwebtoken');
require('dotenv').config()

class JWT {

    create_token(data: any) {
        let secret = process.env.SECRET;
        data.password = ""
        return jwt.sign(data, secret, {expiresIn: 60 * 60 * 24});
    }

    validate_token(req: any, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            res.status(401).json({
                "message": "Not Logged"
            })
        } else {
            let token = req.headers.authorization;
            // console.log(token)
            let payload;
            try {
                payload = jwt.verify(token, process.env.SECRET)

                if (payload >= moment().unix()) {
                    res.status(401).json({
                        "message": "Token expired"
                    })
                }

            } catch (e) {
            }
            req.current = payload;
            next();
        }
    }

}

export default new JWT();