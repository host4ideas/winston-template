// const logger = require('./logger');

// Tests without containers
// logger.warn("warning information")
// logger.info("info information")
// logger.debug("debug information")

const loggerContainer = require('./logger');
const process1Logger = loggerContainer.get('process1');
const process2Logger = loggerContainer.get('process2');

process1Logger.warn("warning information")
process1Logger.info("info information")
process1Logger.debug("debug information")

process2Logger.warn("warning information")
process2Logger.info("info information")
process2Logger.debug("debug information")
