const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { asciiToJson } = require("../utils/asciiToJson.JS");
const { jsonToAscii } = require("../utils/jsonToAscii");

const parseToJson = async (req, res, next) => {
  const { body } = req;
  let result;
  try {
    result = await asciiToJson(body.msg);
  } catch (error) {
    return next(error);
  }
  res.status(StatusCodes.OK).json(result);
};

const parseToAscii = async (req, res, next) => {
  const { body } = req;
  let result;
  try {
    result = await jsonToAscii(body.msg);
  } catch (error) {
    return next(error);
  }
  res.status(StatusCodes.OK).json(result);
};

module.exports = { parseToJson, parseToAscii };
