const { Model } = require('objection');

class Post extends Model {
    static get tableName() {
        return 'posts';
    }

    static get jsonAttributes() {
        return ['img_links'];
    }

    static get relationMappings() {
        const User = require('./User');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'posts.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Post;
