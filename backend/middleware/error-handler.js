const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    msg: err.message || `SOMETHING WENT WRONG`,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
