const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const { v4: uuidv4 } = require('uuid');

exports.handler = async () => {
    const bucketName = "cmtr-605734c9-uuid-storage-j624";
    const timestamp = new Date().toISOString();
    const fileName = `${timestamp}.json`;
    const uuidArray = Array.from({ length: 10 }, () => uuidv4());

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: JSON.stringify({ ids: uuidArray }),
        ContentType: "application/json"
    };

    try {
        await s3.putObject(params).promise();
        console.log(`✅ File ${fileName} uploaded successfully.`);
    } catch (error) {
        console.error(`❌ Failed to upload file:`, error);
        throw error;
    }
};

