const errorProcesser = (err, req, res, next) => {
  // Internal Errors by default
  const { type = 500, message } = err;
  res
    .status(type)
    .send({
      // send same status as error code
      message: type === 500
        ? 'Internal server error'
        : message,
    });
  next();
};

module.exports = errorProcesser;
