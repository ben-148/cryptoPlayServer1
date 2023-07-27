const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("./utils/loggers/loggerService");
const cors = require("cors");
const apiRouter = require("./routes/api");
const config = require("config");
// const initialData = require("./initialData/initialData");
const fileLogger = require("./fileLogger");
const app = express();
const googleRouter = require("./utils/google/google");

console.log("file", config.get("file"));

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "http://localhost:8181",
    ],
    optionsSuccessStatus: 200,
  })
);

app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/google", googleRouter);
app.use(fileLogger);
app.use("/api", apiRouter);
app.use((req, res, next) => {
  res.status(404).json({ err: "page not found" });
});

// initialData();

module.exports = app;
