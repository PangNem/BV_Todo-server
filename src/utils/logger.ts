import { LoggerOptions, createLogger, format, transports } from 'winston';

const options: LoggerOptions = {
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.simple()
    })
  ]
};

const logger = createLogger(options);

if (process.env.NODE_ENV !== 'production') {
  logger.info(`❗ This is debug mode logger.`);
}

export default logger;
