const dynamoDB = require('../../config');
const { PutCommand, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

class UserRepository {
  async createUser(user) {
    const params = {
      TableName: "app_data",
      Item: user,
      ConditionExpression: "attribute_not_exists(PK)"
    };
    try {
      return await dynamoDB.send(new PutCommand(params));
    } catch (error) {
      if (error.name === "ConditionalCheckFailedException") {
        throw new Error("User already exists");
      }
      throw error;
    }
  }

  async findByEmail(email) {
    const params = {
      TableName: "app_data",
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email
      }
    };

    const result = await dynamoDB.send(new QueryCommand(params));
    return result.Items[0]; // Return the first matching user
  }

  async updateUser(email, updates) {
    const params = {
      TableName: "app_data",
      Key: {
        PK: `USER#${email}`,
        SK: "PROFILE"
      },
      UpdateExpression: "SET apiKey = :apiKey, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":apiKey": updates.apiKey,
        ":updatedAt": new Date().toISOString()
      },
      ReturnValues: "ALL_NEW"
    };

    const result = await dynamoDB.send(new UpdateCommand(params));
    return result.Attributes;
  }

  async getUsageRecords(pk) {
    const params = {
      TableName: "app_data",
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :prefix)",
      ExpressionAttributeValues: {
        ":pk": pk,
        ":prefix": "QUOTA#"
      }
    };

    const result = await dynamoDB.send(new QueryCommand(params));
    return result.Items || [];
  }

  async getUsage(email, date) {
    const params = {
      TableName: "app_data",
      KeyConditionExpression: "PK = :pk AND SK = :sk",
      ExpressionAttributeValues: {
        ":pk": "USER#" + email,
        ":sk": "QUOTA#" + date
      }
    };

    const result = await dynamoDB.send(new QueryCommand(params));

    return result.Items?.[0]?.usage || 0;
  }
}

module.exports = new UserRepository();