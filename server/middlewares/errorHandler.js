module.exports = (err, req, res, next) => {
    console.log(err);
    
    const message = err.message || 'Something went wrong!';
    const statusCode = err.status || 500;

    res.status(statusCode).json({ err: { message } });
}