// const loggerContainer = require('./logger');
// const process1Logger = loggerContainer.get('process1');
// const process2Logger = loggerContainer.get('process2');

// process1Logger.info("info information")
// process1Logger.warn("warning information")
// process1Logger.debug("debug information")

// process2Logger.info("info information")
// process2Logger.warn("warning information")
// process2Logger.debug("debug information")

const logger = require('./logger')("label value");

logger.info("info information")
logger.warn("warning information")
logger.debug("debug information")