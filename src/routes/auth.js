const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (router) => {
    router.post(
        '/login',
        body('username').isString(),
        body('password').isString(),
        asyncHandler(async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body;

            const user = await User.query().findOne({ username });

            if (!user) {
                return res.status(404);
            }

            const passwordMatch = bcrypt.compare(password, user.hash);

            if (passwordMatch) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        username: user.username
                    },
                    process.env.SECRET
                );

                return res.json({ token });
            }

            return res.status(401);
        })
    );
};
