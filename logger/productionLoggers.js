const winston = require('winston');
const { format, transports } = winston;
const { Console, File } = transports;
const { label, combine, timestamp, json, printf } = format;

const productionContainer = new winston.Container();

const myConsoleFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const myVerboseFormat = json(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

/**
 * @typedef Levels
 * @property {integer} error 0
 * @property {integer} warn 1
 * @property {integer} info 2
 * @property {integer} http 3
 * @property {integer} verbose 4
 * @property {integer} debug 5
 * @property {integer} silly 6
 */

/**
 * @typedef Options
 * @property {string} filename The path where to save the log file
 * @property {string} level The log level @type {Levels}
 * @property {winston.Logform.Format} format The text format of the full log row
 */

/**
 * Function to set the properties for the Console transporter
 * @param {string} labelStr The text value of the label
 * @returns {Options} An object with the properties
 */
const setConsoleOptions = (labelStr) => (
	{
		filename: './logs/productionLogs.log',
		level: 'info',
		format: combine(
			timestamp(),
			label({ label: labelStr }),
			myConsoleFormat,
		),
	});

/**
* Function to set the properties for the File transporter
* @param {string} labelStr The text value of the label
* @returns {Options} An object with the properties
*/
const setVerboseOptions = (labelStr) => (
	{
		filename: './logs/productionLogs.log',
		level: 'info',
		format: combine(
			timestamp(),
			label({ label: labelStr }),
			myVerboseFormat,
		),
	});

// Add one logger for each of the process, methods, classes, etc needed

productionContainer.add('process1', {
	transports: [
		new Console(setConsoleOptions('process1')),
		new File(setVerboseOptions('process1'))
	],
});

productionContainer.add('process2', {
	transports: [
		new Console(setConsoleOptions('process2')),
		new File(setVerboseOptions('process2'))
	],
});

module.exports = productionContainer;