const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Initialize S3 client
const s3 = new AWS.S3();
const BUCKET_NAME = "uuid-storage";

exports.handler = async (event) => {
    try {
        
        const fileName = new Date().toISOString() + ".json";

        
        const uuidList = Array.from({ length: 10 }, () => uuidv4());

        
        const fileContent = JSON.stringify({ ids: uuidList }, null, 4);

        
        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: fileContent,
            ContentType: "application/json"
        }).promise();

        return { status: "success", file: fileName };
    } catch (error) {
        console.error("Error uploading to S3:", error);
        return { status: "error", message: error.message };
    }
};
