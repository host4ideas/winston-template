const winston = require('winston');
const { createLogger, format, transports } = winston;
const { Console, File } = transports;
const { combine, label, colorize, timestamp, printf } = format;
var path = require('path');

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label} > ${path.basename(require.main.filename)}] ${level}: ${message}`;
});

/**
 * @typedef Levels
 * @property {integer} error 0 - Very severe error events that might cause the application to terminate.
 * @property {integer} warn 1 - Error events of considerable importance that will prevent normal program execution, but might still allow the application to continue running.
 * @property {integer} info 2 - Informational messages that might make sense to end users and system administrators, and highlight the progress of the application.
 * @property {integer} http 3
 * @property {integer} verbose 4 - Information broadly interesting to developers who do not have a specialized interest in the specific subsystem. Might include minor (recoverable) failures and issues indicating potential performance problems.
 * @property {integer} debug 5 - Fairly detailed tracing messages. Calls for entering, returning, or throwing an exception are traced at this level.
 * @property {integer} silly 6 - Highly detailed tracing messages. Produces the most voluminous output.
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
		filename: './logs/devLogs.log',
		level: 'silly',
		format: combine(
			colorize(),
			timestamp(),
			label({ label: labelStr }),
			myFormat,
		),
	});

/**
* Function to set the properties for the File transporter
* @param {string} labelStr The text value of the label
* @returns {Options} An object with the properties
*/
const setVerboseOptions = (labelStr) => (
	{
		filename: './logs/devLogs.log',
		level: 'debug',
		format: combine(
			timestamp(),
			label({ label: labelStr }),
			myFormat,
		),
	});

/**
* Requires as parameter the value as a string of the label. Returns a new Winston Logger instance with the options set by
* setConsoleOptions() and setVerboseOption().
* @param {string} labelStr The label value
* @returns {winston.Logger} A new Winston Logger instance
*/
const loggerCreate = (labelStr) => {

	const transportsOptions = {
		console: new Console(setConsoleOptions(labelStr)),
		file: new File(setVerboseOptions(labelStr))
	};

	return createLogger({
		transports: [
			transportsOptions.console,
			transportsOptions.file
		]
	})
}

module.exports = loggerCreate;