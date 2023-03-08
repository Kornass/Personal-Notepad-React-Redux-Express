const errorHandler = (err, req, res, next) => {
  // status thrown by a controller, if doesn't exist, throw 500 (server error)
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  // error response
  res.json({
    message: err.message,
    // do not throw in production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
