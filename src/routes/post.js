const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

module.exports = (router) => {
    router.post(
        '/post',
        asyncHandler(async (req, res) => {
            const { text, imgLinks } = req.body;
            const { id: userId } = req.user;

            const timestamp = new Date().valueOf();

            const post = await Post.query().insert({
                user_id: userId,
                img_links: imgLinks,
                text,
                created_at: timestamp,
                updated_at: timestamp
            });

            res.json(post);
        })
    );

    router.get(
        '/post',
        asyncHandler(async (req, res) => {
            const { id } = req.user;

            const posts = await Post.query().where('user_id', id);

            res.json({ posts });
        })
    );
};
