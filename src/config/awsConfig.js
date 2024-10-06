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

export const s3DeleteImage = async (photoKey) => {
  const params = {
    Key: photoKey,
    Bucket: AWS_BUCKET_NAME,
  };

  await s3.deleteObject(params).promise();
};
