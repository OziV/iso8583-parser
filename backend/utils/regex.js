const regexFunc = (contentType, str, field) => {
  let result;
  switch (contentType) {
    case "n":
      result = isNumericString(str)
        ? ""
        : `FIELD NUMBER \'${field}\' MUST CONTAIN ONLY NUMERIC`;
      break;
    case "an":
      result = isAlphaNumericString(str)
        ? ""
        : `FIELD NUMBER \'${field}\' MUST CONTAIN ONLY ALPHA NUMERIC`;
      break;
    case "ans":
      result = isAllowedString(str)
        ? ""
        : `FIELD NUMBER '${field}' MUST CONTAIN ONLY ALPHA NUMERIC & SPECIAL CHARCTERS`;
      break;
    case "b":
      result = isBinaryData(str)
        ? ""
        : `FIELD NUMBER '${field}' MUST CONTAIN ONLY BINARY DATA`;
      break;
    default:
      return;
  }

  return result;
};

function isNumericString(str) {
  const numericRegex = /^[0-9]+$/;
  return numericRegex.test(str);
}

function isAlphaNumericString(str) {
  const alphanumericWithSpaceRegex = /^[a-zA-Z0-9\s]+$/;
  return alphanumericWithSpaceRegex.test(str);
}

function isAllowedString(str) {
  const allowedRegex = /^[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
  return allowedRegex.test(str);
}

function isBinaryData(str) {
  const binaryRegex = /^[01]+$/;
  return binaryRegex.test(str);
}

module.exports = { regexFunc };
