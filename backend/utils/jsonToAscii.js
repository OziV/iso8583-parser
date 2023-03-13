const { ISO8583config } = require("../assets/iso8583Config");
const { codeISO8583Bitmap } = require("./bitmap/code");
const { regexFunc } = require("./regex");

const jsonToAscii = async (msg) => {
  const messageJson = JSON.parse(msg);
  let result = "";
  let mti = messageJson.MTI;
  let primaryBitMap = "";
  let secondaryBitMap = "";
  let bitMapLength = 16;
  let is128Fields = false;
  let isoMsg = "";

  try {
    bitmap = await codeISO8583Bitmap(messageJson);
    is128Fields = bitmap.is128Fields;
    primaryBitMap = bitmap.primaryBitMap;
    secondaryBitMap = bitmap.secondaryBitMap;
    bitMapLength = bitmap.bitMapLength;
    result = mti + primaryBitMap + secondaryBitMap;

    for (let elment in messageJson.dataElements) {
      let key = elment;
      let value = messageJson.dataElements[elment];
      let valueLength = value.length;

      if (elment === "1") {
        continue;
      }

      if (!ISO8583config[elment].fixedLength) {
        if (valueLength > ISO8583config[elment].maxLength) {
          throw new Error(
            `FIELD NUMBER \'${elment}\' IS MORE THEN THE MAX LENGTH `
          );
        }

        let msg = regexFunc(ISO8583config[elment].contentType, value, elment);
        if (msg !== undefined && msg.length !== 0) {
          throw new Error(msg);
        }

        contentLength = ISO8583config[elment].contentLength;

        if (contentLength === 3) {
          if (valueLength <= 9) {
            isoMsg += "00" + valueLength + value;
          } else if (valueLength <= 99) {
            isoMsg += "0" + valueLength + value;
          } else {
            isoMsg += valueLength + value;
          }
          continue;
        }

        if (contentLength === 2) {
          if (valueLength <= 9) {
            isoMsg += "0" + valueLength + value;
          } else if (valueLength <= 99) {
            isoMsg += valueLength + value;
          }
          continue;
        }
        isoMsg += valueLength + value;
      } else {
        if (valueLength !== ISO8583config[elment].contentLength) {
          throw new Error(
            `FIELD NUMBER \'${elment}\' IS NOT IN THE CORRECT LENGTH `
          );
        }
        let msg = regexFunc(ISO8583config[elment].contentType, value, elment);
        if (msg !== undefined && msg.length !== 0) {
          throw new Error(msg);
        }
        isoMsg += value;
      }
    }
    result = mti + primaryBitMap + secondaryBitMap + isoMsg;
  } catch (error) {
    console.log(error);
  }
  return result;
};

module.exports = { jsonToAscii };
