/*
	Discoment this for container example
*/
// const loggerContainer = require('./logger');
// const process1Logger = loggerContainer.get('process1');
// const process2Logger = loggerContainer.get('process2');

// process1Logger.info("info information")
// process1Logger.warn("warning information")
// process1Logger.debug("debug information")

// process2Logger.info("info information")
// process2Logger.warn("warning information")
// process2Logger.debug("debug information")

/*
	Example with loggers changing options
*/

/*
 *  error 0 - Very severe error events that might cause the application to terminate.
 *  warn 1 - Error events of considerable importance that will prevent normal program execution, but might still allow the application to continue running.
 *  info 2 - Informational messages that might make sense to end users and system administrators, and highlight the progress of the application.
 *  http 3
 *  verbose 4 - Information broadly interesting to developers who do not have a specialized interest in the specific subsystem. Might include minor (recoverable) failures and issues indicating potential performance problems.
 *  debug 5 - Fairly detailed tracing messages. Calls for entering, returning, or throwing an exception are traced at this level.
 *  silly 6 - Highly detailed tracing messages. Produces the most voluminous output.
 */
const logger = require("./logger")("label value");

logger.error("error information");
logger.warn("warning information");
logger.info("info information");
logger.verbose("error information");
logger.debug("warning information");
logger.silly("silly information");
