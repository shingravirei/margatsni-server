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

            if (!posts) return res.status(404).end();

            return res.json({ posts });
        })
    );

    router.put(
        '/post/:id',
        asyncHandler(async (req, res) => {
            const { text } = req.body;
            const { id } = req.params;

            const updatedPost = await Post.query().patchAndFetchById(id, {
                text
            });

            if (!updatedPost) return res.status(404).end();

            return res.json({ updatedPost });
        })
    );

    router.delete(
        '/post/:id',
        asyncHandler(async (req, res) => {
            const { id } = req.params;

            const result = await Post.query().deleteById(id);

            if (result === 0) return res.status(404).end();

            return res.status(204).end();
        })
    );
};
