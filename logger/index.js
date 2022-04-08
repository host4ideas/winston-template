require('dotenv').config();
const productionContainer = require('./productionLoggers')
const devContainer = require('./devLoggers')

let logger = null;

if (process.env.NODE_ENV === 'production') {
	logger = productionContainer;
} else {
	logger = devContainer;
}

module.exports = logger;