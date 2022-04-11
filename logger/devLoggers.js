const winston = require('winston');
const { createLogger, format, transports } = winston;
const { Console, File } = transports;
const { combine, label, colorize, timestamp, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const setConsoleOptions = (labelStr) => (
	{
		filename: './logs/devLogs.log',
		level: 'debug',
		format: combine(
			colorize(),
			timestamp(),
			label({ label: labelStr }),
			myFormat,
		),
	});

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