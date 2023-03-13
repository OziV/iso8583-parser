const decodeISO8583Bitmap = async (bitmapHex) => {
  // Convert the bitmap from hex to binary
  let binaryBitmap = "";
  for (let i = 0; i < bitmapHex.length; i++) {
    let hexValue = parseInt(bitmapHex[i], 16);
    let binaryValue = ("0000" + hexValue.toString(2)).slice(-4);
    binaryBitmap += binaryValue;
  }

  // Determine which fields are present based on the bitmap
  let fields = [];
  for (let i = 0; i < binaryBitmap.length; i++) {
    if (binaryBitmap[i] === "1") {
      fields.push(i + 1);
    }
  }

  // Create the JSON object
  let output = {};
  output.bitmap = bitmapHex;
  output.fields = fields;

  return output;
};

module.exports = { decodeISO8583Bitmap };
