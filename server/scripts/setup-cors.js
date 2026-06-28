import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import path from "node:path"
import dotenv from 'dotenv';
const __dirname = import.meta.dirname
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// 1. Initialize S3 client with your Railway credentials
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  endpoint: process.env.BUCKET_ENDPOINT, 
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
});

// 2. Define the CORS policy rules
const corsParams = {
  Bucket: process.env.BUCKET_NAME,
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedHeaders: ["*"], // Allows all headers
        AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"], // Allowed operations
        AllowedOrigins: ["*"], // All websites
        ExposeHeaders: [],
        MaxAgeSeconds: 3000,
      },
    ],
  },
};

// 3. Send the command to Railway's bucket
async function run() {
  try {
    const data = await s3.send(new PutBucketCorsCommand(corsParams));
    console.log("CORS configured successfully!", data);
  } catch (err) {
    console.error("Error configuring CORS", err);
  }
}

run();
