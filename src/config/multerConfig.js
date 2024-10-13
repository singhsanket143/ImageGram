import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./awsConfig.js";
import { AWS_BUCKET_NAME } from "./serverConfig.js";


export const s3uploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            if(!file) {
                console.log(file);
                return cb(new Error("File not found"));
            }
            // Check mimetype for jpeg and png files only 
            if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
                return cb(new Error("File type not supported"));
            }
            console.log(file);
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // to make sure the key is unique
            cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
        }
    })
}); // uploader is a middleware