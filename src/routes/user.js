const asyncHandler = require('express-async-handler');
const { body, param, validationResult } = require('express-validator');
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

            const timestamp = new Date().valueOf();

            await User.query().insert({
                username,
                email,
                hash,
                created_at: timestamp,
                updated_at: timestamp
            });

            return res.status(201).end();
        })
    );

    router.delete(
        '/user/:id',
        param('id').toInt(),
        asyncHandler(async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;

            if (id !== req.user.id) return res.status(401).end();

            const result = await User.query().deleteById(id);

            if (result === 0) {
                return res.status(404).end();
            }

            return res.status(204).end();
        })
    );
};
