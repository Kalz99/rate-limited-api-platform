const dynamoDB = require('../config');
const { PutCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');

class UserRepository {
  async createUser(user) {
    const params = {
      TableName: "app_data",
      Item: user
    };

    await dynamoDB.send(new PutCommand(params));
    return user;
  }

  async getUserByEmail(email) {
    // you'll use GSI later
  }
}

module.exports = new UserRepository();