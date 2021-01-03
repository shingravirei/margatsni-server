const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (router) => {
    router.post(
        '/user',
        body('username')
            .exists()
            .withMessage('username missing')
            .isString()
            .trim()
            .withMessage('must be a string')
            .isLength({ min: 3 }),
        body('email').isEmail(),
        body('password').isString().isLength({ min: 6 }),
        asyncHandler(async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, email, password } = req.body;

            const hash = await bcrypt.hash(password, 10);

            await User.query().insert({
                username,
                email,
                hash
            });

            return res.status(201);
        })
    );
};
