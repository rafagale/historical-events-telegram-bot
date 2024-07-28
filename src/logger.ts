import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

console.log('Initializing logger...');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      dirname: 'logs', 
      filename: 'application-%DATE%.log', 
      datePattern: 'YYYY-MM-DD', 
      zippedArchive: true, 
      maxSize: '20m', 
      maxFiles: '14d',
    })
  ]
});


export default logger;
