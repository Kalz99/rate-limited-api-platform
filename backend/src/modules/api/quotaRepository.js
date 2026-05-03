const dynamoDB = require('../../config');
const { GetCommand, PutCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

class QuotaRepository {
    async getUsage(PK, date) {
        const params = {
            TableName: "app_data",
            Key: {
                PK: PK,
                SK: `QUOTA#${date}`
            }
        };

        const result = await dynamoDB.send(new GetCommand(params));
        return result.Item?.usage || 0;
    }

    async incrementUsage(PK, date) {
        const params = {
            TableName: "app_data",
            Key: {
                PK: PK,
                SK: `QUOTA#${date}`
            },
            UpdateExpression: "SET #usage = if_not_exists(#usage, :start) + :inc, #updatedAt = :now",
            ExpressionAttributeNames: {
                "#usage": "usage",
                "#updatedAt": "updatedAt"
            },
            ExpressionAttributeValues: {
                ":start": 0,
                ":inc": 1,
                ":now": new Date().toISOString()
            }
        };

        await dynamoDB.send(new UpdateCommand(params));
    }
}


module.exports = new QuotaRepository();