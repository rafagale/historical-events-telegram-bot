import fs from 'fs/promises';
import path from 'path';
import logger from '../logger';

const chatIdsFilePath = path.resolve(__dirname, '../../chatIds.json');

const loadChatIds = async (): Promise<string[]> => {
  try {
    const data = await fs.readFile(chatIdsFilePath, 'utf-8');
    return JSON.parse(data) || [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    logger.error(`Failed to load chat IDs: ${(error as Error).message}`);
    return [];
  }
};

const saveChatIds = async (chatIds: string[]): Promise<void> => {
  try {
    await fs.writeFile(chatIdsFilePath, JSON.stringify(chatIds, null, 2));
    logger.info('Chat IDs saved successfully.');
  } catch (error) {
    logger.error(`Failed to save chat IDs: ${(error as Error).message}`);
  }
};

const addChatId = async (chatId: string): Promise<void> => {
  const chatIds = await loadChatIds();
  if (!chatIds.includes(chatId)) {
    chatIds.push(chatId);
    await saveChatIds(chatIds);
    logger.info(`Added new chat ID: ${chatId}`);
  }
};

export { loadChatIds, saveChatIds, addChatId };
