const asyncHandler = require('express-async-handler');

module.exports = (router) => {
    router.get(
        'user',
        asyncHandler(async (req, res, next) => {
            res.status(200).json({ all: 'users' });
        })
    );
};
