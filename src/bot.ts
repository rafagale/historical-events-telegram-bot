import TelegramBot from 'node-telegram-bot-api';
import config from './config';
import loadEvents from './loadEvents';
import path from 'path';
import logger from './logger';
import cron from 'node-cron';
import { loadChatIds, addChatId } from './utils/chatIdManager';
import { getTodayDate } from './utils/dateUtils';
import { Event } from './models/event';
import { Message } from './models/message';

const bot = new TelegramBot(config.telegramToken, { polling: true });

const sendEventToTelegram = async (chatIds: string[], caption: string, mediaPath?: string): Promise<void> => {
  for (const chatId of chatIds) {
    try {
      if (mediaPath) {
        const resolvedPath = path.resolve(__dirname, '..', mediaPath);
        await bot.sendPhoto(chatId, resolvedPath, { caption });
        logger.info(`Photo sent to chat ID: ${chatId}, path: ${resolvedPath}`);
      } else {
        await bot.sendMessage(chatId, caption);
        logger.info(`Text message sent to chat ID: ${chatId}`);
      }
    } catch (error) {
      logger.error(`Error sending message to chat ID ${chatId}: ${(error as Error).message}`);
    }
  }
};

const scheduleEvents = (events: Event[], chatIds: string[]): void => {
  const cronExpression = config.eventsCronExpression;

  if (typeof cronExpression !== 'string' || !cron.validate(cronExpression)) {
    logger.error('Invalid cron expression for events.');
    return;
  }

  cron.schedule(cronExpression, async () => {
    logger.info('Cron job for events triggered.');
    const todayDate = getTodayDate();
    const todayEvents = events.filter(event => event.date === todayDate);

    if (todayEvents.length === 0) {
      logger.info(`No events found for today: ${todayDate}`);
      return;
    }

    for (const event of todayEvents) {
      const caption = event.message;
      await sendEventToTelegram(chatIds, caption, event.mediaPath);
    }
  });

  logger.info(`Scheduled events with cron expression: ${cronExpression}`);
};

const initializeBot = async () => {
  try {
    const chatIds = await loadChatIds();
    const events: Event[] = loadEvents();

    bot.on('message', async (msg: Message) => {
      const chatId = msg.chat.id.toString();
      await addChatId(chatId);
      logger.info(`Added chat ID: ${chatId}`);
    });

    scheduleEvents(events, chatIds);
    logger.info('Bot initialized and tasks scheduled.');
  } catch (error) {
    logger.error(`Error initializing bot: ${(error as Error).message}`);
  }
};

initializeBot();
