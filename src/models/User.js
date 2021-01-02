const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'email', 'hash'],
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string' },
                hash: { type: 'string' }
            }
        };
    }
}

module.exports = User;
