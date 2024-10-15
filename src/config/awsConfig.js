import AWS from "aws-sdk";
import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
} from "./serverConfig.js";

export const s3 = new AWS.S3({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export const s3Delete = async (key) => {
  await s3
    .deleteObject({
      Bucket: AWS_BUCKET_NAME,
      Key: key, // name of the image from url of image
    })
    .promise();
};
