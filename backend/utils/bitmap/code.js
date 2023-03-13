const codeISO8583Bitmap = async (json) => {
  const dataElements = json.dataElements;
  let result = {};
  let hexBitmap = "";
  try {
    // Create a new Buffer to hold the bitmap
    const bitmap = Buffer.alloc(16).fill(0);

    // Set the bits for each field in the JSON object
    for (const field in dataElements) {
      if (field <= 128) {
        if (field === 1) {
          continue;
        }
        bitmap[Math.floor((field - 1) / 8)] |= 1 << (7 - ((field - 1) % 8));
      }
    }

    // Convert the bitmap to hex
    hexBitmap = bitmap.toString("hex").toUpperCase();

    function containsNumbers(str) {
      return /[0-9]/.test(str);
    }

    let secondBitmap = hexBitmap.substring(16, 32);
    let isSecondBitmap = containsNumbers(secondBitmap);

    if (hexBitmap.substring(0, 1) === "F" || isSecondBitmap) {
      result.is128Fields = true;
      result.primaryBitMap =
        hexBitmap.substring(0, 1) === "F"
          ? hexBitmap.substring(0, 16)
          : `F${hexBitmap.substring(1, 16)}`;
      result.secondaryBitMap = hexBitmap.substring(16, 32);
      result.bitMapLength = hexBitmap.length;
    } else {
      result.is128Fields = false;
      result.primaryBitMap = hexBitmap;
      result.secondaryBitMap = "";
      result.bitMapLength = hexBitmap.length;
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

module.exports = { codeISO8583Bitmap };
