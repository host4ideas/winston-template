const winston = require('winston');
const { format, transports } = winston;
const { Console, File } = transports;
const { combine, label, colorize, timestamp, printf } = format;

const devContainer = new winston.Container();

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const setConsoleOptions = (labelStr) => (
	{
		filename: './logs/devLogs.log',
		level: 'debug',
		format: combine(
			timestamp(),
			label({ label: labelStr }),
			colorize(),
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

devContainer.add('process1', {
	transports: [
		new Console(setConsoleOptions('process1')),
		new File(setVerboseOptions('process1'))
	],
});

devContainer.add('process2', {
	transports: [
		new Console(setConsoleOptions('process2')),
		new File(setVerboseOptions('process2'))
	],
});

module.exports = devContainer;