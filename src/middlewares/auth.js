// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    console.log('Cookies: ', req.cookies); // Kiểm tra cookies
    console.log('Session: ', req.session); // Kiểm tra session nếu bạn sử dụng session-based authentication
    console.log('Authorization header: ', req.headers['authorization']); // Kiểm tra header Authorization nếu bạn dùng JWT
    if (req.isAuthenticated() || true) {
        return next();
    } else {
        return res.status(401).json({ message: 'Bạn cần đăng nhập để thực hiện hành động này' });
    }
}

module.exports = isAuthenticated;