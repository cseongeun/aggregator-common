import { ConsoleLogger, Injectable } from '@nestjs/common';
import { createLogger, format, transports, Logform } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';

@Injectable()
export class WinstonLoggerService extends ConsoleLogger {
  private levels: any;
  private colors: any;

  private readonly rotateLoggerFormat: Logform.Format;
  private readonly rotateOptions;

  private readonly rotateLogger: winston.Logger;
  private readonly rotateWarnLogger: winston.Logger;
  private readonly rotateErrorLogger: winston.Logger;
  private readonly stdoutLogger: winston.Logger;

  constructor() {
    super();

    this.rotateLoggerFormat = format.combine(format.timestamp(), format.json());

    this.rotateOptions = {
      datePattern: 'YYYY-MM-DD',
      maxFiles: '5d',
      maxSize: '100m',
      utc: true,
    };

    this.rotateLogger = createLogger({
      level: 'info',
      format: this.rotateLoggerFormat,
      transports: [
        new DailyRotateFile({
          level: 'info',
          filename: `./logs/%DATE%.log`,
          ...this.rotateOptions,
        }),
      ],
    });

    this.rotateWarnLogger = createLogger({
      level: 'warn',
      format: this.rotateLoggerFormat,
      transports: [
        new DailyRotateFile({
          level: 'warn',
          filename: `./logs/%DATE%-warn.log`,
          ...this.rotateOptions,
        }),
      ],
    });

    this.rotateErrorLogger = createLogger({
      level: 'error',
      format: this.rotateLoggerFormat,
      transports: [
        new DailyRotateFile({
          level: 'error',
          filename: `./logs/%DATE%-error.log`,
          ...this.rotateOptions,
        }),
      ],
    });

    this.stdoutLogger = createLogger({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
      transports: [new transports.Console()],
    });
  }

  private _getConsoleLogger(): winston.Logger {
    return this.stdoutLogger;
  }

  log(message: string, consoleMessage?: string): void {
    this.rotateLogger.info(message);
    this._getConsoleLogger().info(consoleMessage ? consoleMessage : message);
  }

  warn(message: string, consoleMessage?: string): void {
    this.rotateWarnLogger.warn(message);
    this._getConsoleLogger().warn(consoleMessage ? consoleMessage : message);
  }

  error(message: string, consoleMessage?: string): void {
    this.rotateErrorLogger.error(message);
    this._getConsoleLogger().error(consoleMessage ? consoleMessage : message);
  }
}
