const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { iso8583fields } = require("../assets/iso8583fields");
const { ISO8583config } = require("../assets/iso8583Config");

const isoFields = async (req, res, next) => {
  let result;
  try {
    result = iso8583fields;
  } catch (error) {
    return next(error);
  }
  res.status(StatusCodes.OK).json(result);
};

const isoFieldsConfig = async (req, res, next) => {
  let result;
  try {
    result = ISO8583config;
  } catch (error) {
    return next(error);
  }
  res.status(StatusCodes.OK).json(result);
};

module.exports = { isoFields, isoFieldsConfig };
