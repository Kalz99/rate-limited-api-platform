// services/apiKeyService.js
const crypto = require('crypto');

class ApiKeyService {
    generateApiKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

module.exports = new ApiKeyService();