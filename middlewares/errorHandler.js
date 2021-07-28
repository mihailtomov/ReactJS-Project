module.exports = (err, req, res, next) => {
    const message = err.message || 'Something went wrong!';
    const statusCode = err.status || 500;

    res.status(statusCode).json({ err: { message } });
}