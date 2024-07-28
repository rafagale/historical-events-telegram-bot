# Historical Events Telegram Bot

This Telegram bot sends scheduled messages about historical events, designed to educate and engage users by sharing interesting historical facts about historical figures of your liking.

## Features

- **Scheduled Messages**: Automatically sends text messages and photos to multiple chat IDs at specified times.
- **Configurable**: Easily set up through environment variables.
- **TypeScript**: Written in TypeScript for type safety and better development experience.
- **Logging**: Uses Winston for comprehensive logging and easier debugging.
- **Cross-Platform**: Compatible with both Windows and Linux.

## Installation

### Prerequisites

Make sure you have Node.js (>=14.0.0) and npm (>=6.0.0) installed on your machine.

1. **Clone the repository:**
    ```sh
    git clone https://github.com/rafagale/historical-events-telegram-bot.git
    cd historical-events-telegram-bot
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    - Copy `.env.example` to `.env` and fill in the required values:
    ```sh
    cp .env.example .env
    ```

4. **Obtain Telegram Bot Token**:
    - Open Telegram and search for the [BotFather](https://t.me/BotFather).
    - Start a chat with BotFather and send the command `/newbot`.
    - Follow the instructions to create a new bot. You will receive a token to access the HTTP API.
    - Copy the token and add it to your `.env` file as `TELEGRAM_TOKEN`.

5. **Build the project:**
    ```sh
    npm run build
    ```

6. **Run the bot:**
    ```sh
    npm start
    ```

7. **Add the bot to a group or channel**:
    - Add the bot to a group or channel where you want it to send messages.
    - The bot will automatically pick up the chat ID when it is added to a group or channel and someone sends a message.

## Configuration

Create a `.env` file in the root directory and add your configuration details. Here is an example:

```env
TELEGRAM_TOKEN=your-telegram-bot-token
EVENTS_CRON_EXPRESSION=8 * * * *
```

- `TELEGRAM_TOKEN`: Your Telegram bot token from BotFather.
- `EVENTS_CRON_EXPRESSION`: Cron expression to schedule event messages.

## Usage

Commonly used commands:

- **Start the bot**: `npm start`
- **Build the project**: `npm run build`
- **Lint the code**: `npm run lint`
- **Fix lint issues**: `npm run lint:fix`
- **Format code**: `npm run prettier`
- **Clean the build directory**: `npm run clean`

## Project Structure

```
historical-events-telegram-bot/
├── dist/                   # Compiled output
├── events/                 # Event files
│   ├── churchill/          # Churchill events
│   │   └── events.json
├── media/                  # Media files
│   ├── churchill/          # Churchill media
│   │   └── event_image.jpg
├── node_modules/           # Node.js modules
├── src/                    # Source files
│   ├── models/             # Data models
│   │   ├── config.ts
│   │   ├── event.ts
│   │   └── message.ts
│   ├── types/              # Type definitions
│   │   ├── dotenv-safe.d.ts
│   │   ├── node-cron.d.ts
│   │   └── node-telegram-bot-api.d.ts
│   ├── utils/              # Utility functions
│   │   ├── chatIdManager.ts
│   │   └── dateUtils.ts
│   ├── bot.ts              # Main bot logic
│   ├── config.ts           # Configuration
│   ├── loadEvents.ts       # Event loading logic
│   └── logger.ts           # Logger setup
├── .env                    # Environment variables
├── .env.example            # Example environment variables file
├── package-lock.json       # NPM lock file
├── package.json            # NPM configuration and scripts
└── tsconfig.json           # TypeScript configuration
```

## Historical Events Structure

### Example JSON Structure for Historical Events

Here is an example structure of a JSON file for historical events (`events/churchill/events.json`):

```json
[
  {
    "date": "30-11",
    "message": "On this day, Winston Churchill was born in Blenheim Palace, United Kingdom (1874).",
    "mediaPath": "media/churchill/churchill_birth.jpg"
  },
  {
    "date": "04-06",
    "message": "On this day, Winston Churchill delivered his famous speech 'We shall fight on the beaches' (1940)."
  }
]
```

- `date`: The date of the historical event in `DD-MM` format.
- `message`: The message to be sent to the Telegram chat.
- `mediaPath` (optional): The path to the media file associated with the event.

## Development

1. **Run in development mode**: Watches for changes and automatically restarts the bot.
    ```sh
    npm run dev
    ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes.
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin my-feature-branch`
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to the maintainers of the following projects:

- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [node-cron](https://github.com/node-cron/node-cron)
- [winston](https://github.com/winstonjs/winston)
- [dotenv-safe](https://github.com/rolodato/dotenv-safe)
