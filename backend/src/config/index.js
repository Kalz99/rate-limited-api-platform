const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const client = new DynamoDBClient({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoDB = DynamoDBDocumentClient.from(client);

module.exports = dynamoDB;
