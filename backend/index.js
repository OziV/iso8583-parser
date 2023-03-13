require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
// const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const parserRouter = require("./routes/parser");
const iso8583Router = require("./routes/iso8583");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/parser", parserRouter);
app.use("/api/v1/iso8583", iso8583Router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4040;

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT \`${port}\`...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
