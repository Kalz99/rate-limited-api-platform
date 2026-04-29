const dynamoDB = require('../config');
const { PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

class UserRepository {
  async createUser(user) {
    const params = {
      TableName: "app_data",
      Item: user
    };

    await dynamoDB.send(new PutCommand(params));
    return user;
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