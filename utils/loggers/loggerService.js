const express = require('express');
const app = express();
const morganLogger = require('./morgan');
const config = require('config');

const loggerOption = config.get("logger");

const loggerService = () => {
    switch (loggerOption) {
        case "morgan":
        default:
            return morganLogger;
    }
};

module.exports = loggerService;