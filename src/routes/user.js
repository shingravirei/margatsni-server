const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (router) => {
    router.post(
        '/user',
        body('username').isString(),
        body('email').isEmail(),
        body('password').isString(),
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
