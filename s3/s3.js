const AWS = require("aws-sdk");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

// Configure AWS S3
const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// ✅ Upload file to S3
function uploadFile(filePath, key) {
    const fileContent = fs.readFileSync(filePath);

    const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: key, // S3 object key (like filename)
        Body: fileContent,

    };

    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.error("❌ Upload failed:", err);
        } else {
            console.log("✅ File uploaded successfully:", data.Location);
        }
    });
}

// ✅ List files in S3 bucket
function listFiles() {
    const listParams = {
        Bucket: BUCKET_NAME,
    };

    s3.listObjectsV2(listParams, function (err, data) {
        if (err) {
            console.error("❌ Failed to list files:", err);
        } else {
            console.log("📄 Files in bucket:");
            data.Contents.forEach((item) => console.log(`- ${item.Key}`));
        }
    });
}

async function uploadBufferToS3(buffer, key, mimetype) {
    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}
module.exports = {
    uploadFile,
    listFiles,
    uploadBufferToS3

};