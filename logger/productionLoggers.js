const winston = require('winston');
const { format, transports } = winston;
const { Console, File } = transports;
const { label, combine, timestamp, json } = format;

const productionContainer = new winston.Container();

const myFormat = json(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const setConsoleOptions = (labelStr) => (
	{
		filename: './logs/productionLogs.log',
		level: 'info',
		format: combine(
			timestamp(),
			label({ label: labelStr }),
			myFormat,
		),
	});

const setVerboseOptions = (labelStr) => (
	{
		filename: './logs/productionLogs.log',
		level: 'info',
		format: combine(
			timestamp(),
			label({ label: labelStr }),
			myFormat,
		),
	});

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