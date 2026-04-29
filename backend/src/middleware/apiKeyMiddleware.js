const dynamoDB = require('../config');
const { QueryCommand } = require('@aws-sdk/lib-dynamodb');

const apiKeyMiddleware = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];

        if (!apiKey) {
            return res.status(401).json({ message: "API key required" });
        }

        const params = {
            TableName: "app_data",
            IndexName: "ApiKeyIndex",
            KeyConditionExpression: "apiKey = :apiKey",
            ExpressionAttributeValues: {
                ":apiKey": apiKey
            }
        };

        const result = await dynamoDB.send(new QueryCommand(params));

        if (!result.Items || result.Items.length === 0) {
            return res.status(403).json({ message: "Invalid API key" });
        }

        const user = result.Items[0];

        req.user = user; // attach user

        next();

    } catch (err) {
        next(err);
    }
};

module.exports = apiKeyMiddleware;