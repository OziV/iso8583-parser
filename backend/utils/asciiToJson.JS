const { ISO8583config } = require("../assets/iso8583Config");
const { iso8583fields } = require("../assets/iso8583fields");
const { decodeISO8583Bitmap } = require("./bitmap/decode");
const { regexFunc } = require("./regex");

const asciiToJson = async (isoString) => {
  let result = {};
  let mti = isoString.substring(0, 4);
  let primaryBitMap = isoString.substring(4, 20);
  let secondaryBitMap = "";
  let bitmapHex = primaryBitMap;
  let bitMapLength = 16;
  let is128Fields = false;
  let isoMsg = isoString.substring(36, isoString.length);
  let getFieldLength = "";
  let fieldValue = "";
  let dataElements = {};

  try {
    if (isoString[4].toUpperCase() === "F") {
      is128Fields = true;
      secondaryBitMap = isoString.substring(20, 36);
    }
    bitmapHex = primaryBitMap + secondaryBitMap;

    let openFields = await decodeISO8583Bitmap(bitmapHex);

    for (let field of openFields.fields) {
      if (field === 1) {
        dataElements[field] = secondaryBitMap;
        continue;
      }
      if (!ISO8583config[field].fixedLength) {
        if (ISO8583config[field].contentLength === 2) {
          getFieldLength = isoMsg.substring(0, 2);
        } else if (ISO8583config[field].contentLength === 3) {
          getFieldLength = isoMsg.substring(0, 3);
        }
        if (ISO8583config[field].contentLength !== getFieldLength.length) {
          throw new Error(
            `FIELD NUMBER \'${field}\' IS NOT IN THE CORRECT LENGTH `
          );
        }

        isoMsg = isoMsg.substring(ISO8583config[field].contentLength);
        fieldValue = isoMsg.substring(0, getFieldLength);

        if (!fieldValue.length >= ISO8583config[field].maxLength) {
          throw new Error(
            `FIELD NUMBER \'${field}\' IS MORE THEN THE MAX LENGTH `
          );
        }

        let msg = regexFunc(
          ISO8583config[field].contentType,
          fieldValue,
          field
        );

        if (msg !== undefined && msg.length !== 0) {
          throw new Error(msg);
        }

        isoMsg = isoMsg.substring(fieldValue.length);

        dataElements[field] = fieldValue;
        continue;
      }

      fieldValue = isoMsg.substring(0, ISO8583config[field].contentLength);

      if (
        fieldValue.length !== ISO8583config[field].contentLength &&
        ISO8583config[field].contentType !== "b"
      ) {
        throw new Error(`FIELD NUMBER \'${field}\' IS NOT THE CORRECT LENGTH `);
      }

      let msg = regexFunc(ISO8583config[field].contentType, fieldValue, field);

      if (msg !== undefined && msg.length !== 0) {
        throw new Error(msg);
      }
      isoMsg = isoMsg.substring(ISO8583config[field].contentLength);

      dataElements[field] = fieldValue;
    }

    result = { MTI: mti, dataElements };
  } catch (error) {
    console.log(error);
  }
  return result;
};

module.exports = { asciiToJson };
