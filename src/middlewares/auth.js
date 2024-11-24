// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ message: 'Bạn cần đăng nhập để thực hiện hành động này' });
    }
}

module.exports = isAuthenticated;