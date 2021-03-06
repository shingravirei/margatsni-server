module.exports = () => (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).end();
    }

    console.log(err);
    return res.status(500).end();
};
