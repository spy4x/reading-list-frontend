import { Injectable, ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { User } from '../../_general/auth/user.model';

@Injectable()
export class LoggerService implements ErrorHandler {

  constructor () {
    // TODO: move sentryDSN string to CI Environment Variables
    Raven
      .config('https://622b08573e5747c3849ea6e5e9cc480e@sentry.io/146872')
      .install();
  }

  handleError (err: any): void {
    if (environment.production) {
      Raven.captureException(err.originalError);
    } else {
      console.error(err);
    }
  }

  log (message: string, params?: any) {
    this.captureMessage('log', message, params);
  }

  debug (message: string, params?: any) {
    this.captureMessage('debug', message, params);
  }

  info (message: string, params?: any) {
    this.captureMessage('info', message, params);
  }

  warn (message: string, params?: any) {
    this.captureMessage('warning', message, params);
  }

  error (message: string, params?: any) {
    this.captureMessage('error', message, params);
  }

  fatal (message: string, params?: any) {
    this.captureMessage('fatal', message, params);
  }

  setUser (user?: User) {
    if (!user) {
      return Raven.setUserContext();
    }
    Raven.setUserContext({
      id: user._id,
      username: user.name,
      email: user.email
    });
  }

  private captureMessage (level: string,
                          message: string,
                          params?: any) {
    params = _.cloneDeep(params) || {};
    params.isProduction = !!(environment.production);
    if (params.isProduction &&
      _.includes(['warning', 'error', 'fatal'], level)) {
      Raven.captureMessage(message, {
        extra: params,
        level: level
      });
    }
    params = _.omitBy(params, _.isUndefined);

    this.logToConsole(level, message, params);
  }

  private logToConsole (level: string, message: string, params?: any) {
    const timestamp = new Date().toISOString();
    let logMessage = `\n[${timestamp}] ${_.capitalize(level)}: ${message}\n`;

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          logMessage += `${key}: ${this.toString(params[key])}\n`;
        }
      }
    }

    switch (level) {
      case 'log':
        console.log(logMessage);
        break;
      case 'debug':
        console.log(logMessage);
        break;
      case 'info':
        console.info(logMessage);
        break;
      case 'warning':
        console.warn(logMessage);
        break;
      case 'error':
        console.error(logMessage);
        break;
      case 'fatal':
        console.error(logMessage);
        break;
      default:
        console.log(logMessage);
        break;
    }
  }

  private toString (obj: any) {
    if (typeof obj !== 'string') {
      obj = JSON.stringify(obj, undefined, 2);
    }

    return obj;
  }

}
