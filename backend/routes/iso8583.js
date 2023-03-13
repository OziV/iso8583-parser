const express = require("express");
const router = express.Router();
const { isoFields, isoFieldsConfig } = require("../controllers/iso8583");

router.get("/fields", isoFields);
router.get("/config", isoFieldsConfig);

module.exports = router;
