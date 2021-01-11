import multer from 'multer';
import * as path from "path";
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/images'),
    filename:(req,file,cb) => {
        console.log("UUID", uuid.v4())
        cb(null, uuid.v4() + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage,
    dest: path.join(__dirname,'../public/images'),
    fileFilter:(req,file,cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if(mimeType && extname){
            return cb(null, true)
        }

        // @ts-ignore
        cb('Error: The file was a image')
    }
}).single('image')
