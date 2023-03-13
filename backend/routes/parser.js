const express = require("express");
const router = express.Router();
const { parseToJson, parseToAscii } = require("../controllers/parser");

router.post("/json", parseToJson);
router.post("/ascii", parseToAscii);

module.exports = router;
