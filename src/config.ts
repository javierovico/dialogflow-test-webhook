import { config } from 'dotenv';
import * as process from 'process';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
config();
export const DB_HOST = process.env.DB_HOST;
export const DB_SOCKET_PATH = process.env.DB_SOCKET_PATH;

export const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0;
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;

export const DB_SINCRONIZE: boolean = ['1', 'TRUE', 'true'].includes(
  process.env.DB_SINCRONIZE || '0',
);

export const APP_SECRET = process.env.APP_KEY;
export const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export const PORT = process.env.PORT || '3000';
export const API_TOKEN = process.env.API_TOKEN;
export const PUPPETEER_OPTIONS = {
  executablePath: process.env.CHROME_PATH ?? undefined,
  args:
    process.env.PUPPETER_NO_SANDBOX && process.env.PUPPETER_NO_SANDBOX == 'true'
      ? ['--no-sandbox']
      : undefined,
};

export const URL_WEBHOOK = process.env.URL_WEBHOOK ?? 'https://undefined.net';
export const SECRET_TOKEN_WEBHOOK = process.env.SECRET_TOKEN_WEBHOOK ?? '';
export const CODE_TIPO_CUENTA_DIALOGFLOW_CX = 'dialogflow_cx';
export const CODE_TIPO_CUENTA_TEST = 'test';
export const CODE_TIPO_CUENTA_VERTEX = 'vertex';

export const TIPOS_CUENTA_CODE_ADMITIDOS = [
  CODE_TIPO_CUENTA_DIALOGFLOW_CX,
  CODE_TIPO_CUENTA_TEST,
  CODE_TIPO_CUENTA_VERTEX,
] as const;

export type TIPO_CUENTA_CODE = (typeof TIPOS_CUENTA_CODE_ADMITIDOS)[number];

export const LOG_LEVEL: LoggerOptions =
  (process.env.LOG_LEVEL && process.env.LOG_LEVEL === 'true') || false;

export const TOKEN_AMBAR_BETA_WHATSAPP_5491145975000 = process.env.TOKEN_AMBAR_BETA_WHATSAPP_5491145975000
export const WHATSAPP_5491145975000_ID = process.env.WHATSAPP_5491145975000_ID
export const WHATSAPP_5491145975000_TOKEN = process.env.WHATSAPP_5491145975000_TOKEN
export const URL_AMBAR_BETA = process.env.URL_AMBAR_BETA
