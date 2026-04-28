import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]): string {
    const fields: Record<string, string> = {
      level,
      message: String(message),
      timestamp: new Date().toISOString(),
    };

    optionalParams.forEach((param, index) => {
      if (typeof param === 'object' && param !== null) {
        fields[`param_${index}`] = JSON.stringify(param);
      } else {
        fields[`param_${index}`] = String(param);
      }
    });

    const tskv = Object.entries(fields)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t');

    return tskv + '\n';
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
}
