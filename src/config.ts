import dotenvSafe from 'dotenv-safe';
import { Config } from './models/config';

dotenvSafe.config({
  example: './.env.example',
  path: './.env', 
});

const config: Config = {
  telegramToken: process.env.TELEGRAM_TOKEN!,
  eventsCronExpression: process.env.EVENTS_CRON_EXPRESSION!
};

export default config;
