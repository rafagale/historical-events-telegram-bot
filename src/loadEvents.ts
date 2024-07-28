import fs from 'fs';
import path from 'path';
import logger from './logger';
import { Event } from './models/event';

const loadEvents = (): Event[] => {
  const eventsDirectory = path.resolve(__dirname, '../events');
  let allEvents: Event[] = [];

  try {
    logger.info(`Loading events from directory: ${eventsDirectory}`);

    const directories = fs.readdirSync(eventsDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    logger.info(`Found directories: ${directories.join(', ')}`);

    directories.forEach(directory => {
      const directoryPath = path.join(eventsDirectory, directory);
      const files = fs.readdirSync(directoryPath);

      logger.info(`Processing directory: ${directory}, found files: ${files.join(', ')}`);

      files.forEach(file => {
        if (file.endsWith('.json')) {
          const filePath = path.join(directoryPath, file);
          const data = fs.readFileSync(filePath, 'utf-8');
          const events = JSON.parse(data) as Event[];
          allEvents = allEvents.concat(events);

          logger.info(`Loaded ${events.length} events from file: ${file}`);
        }
      });
    });

    return allEvents;
  } catch (error) {
    logger.error('Failed to load events:', error);
    return [];
  }
};

export default loadEvents;
