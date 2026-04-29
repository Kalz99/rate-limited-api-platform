const dynamoDB = require('../config');
const { PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

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
}

module.exports = new UserRepository();