require("dotenv").config();

let logger = null;

if (process.env.ENV === "production") {
	logger = require('./productionLoggers')
} else {
    logger = require("./devLoggers");
}

module.exports = logger;
