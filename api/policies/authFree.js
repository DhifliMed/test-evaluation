// middleware for free of auth routes

module.exports = (req, res, next) => {
    next();
}