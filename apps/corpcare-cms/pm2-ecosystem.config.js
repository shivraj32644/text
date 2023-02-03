const path = require('path');
const projectDir = path.dirname(__filename);

const pm2EcosystemConfig = {
  apps: [
    {
      name: `${path.basename(projectDir)}`,
      cwd: path.resolve(projectDir, './'),
      script: 'yarn', // For this example we're using yarn, could also be npm
      args: 'start', // Script to start the Strapi server, `start` by default
      env: {
        APP_KEYS: process.env['APP_KEYS'], // you can find it in your project .env file.
        ADMIN_JWT_SECRET: process.env['ADMIN_JWT_SECRET'],
        API_TOKEN_SALT: process.env['API_TOKEN_SALT'],
        NODE_ENV: process.env['NODE_ENV'],
        DATABASE_HOST: process.env['DATABASE_HOST'], // database Endpoint under 'Connectivity & Security' tab
        DATABASE_PORT: process.env['DATABASE_PORT'],
        DATABASE_NAME: process.env['DATABASE_NAME'], // DB name under 'Configuration' tab
        DATABASE_USERNAME: process.env['DATABASE_USERNAME'], // default username
        DATABASE_PASSWORD: process.env['DATABASE_PASSWORD'],
        AWS_ACCESS_KEY_ID: process.env['AWS_ACCESS_KEY_ID'],
        AWS_ACCESS_SECRET: process.env['AWS_ACCESS_SECRET'], // Find it in Amazon S3 Dashboard
        AWS_REGION: process.env['AWS_REGION'],
        AWS_BUCKET_NAME: process.env['AWS_BUCKET_NAME'],
        EMAIL_DEFAULT_FROM: process.env['EMAIL_DEFAULT_FROM'],
        EMAIL_DEFAULT_FROM_REPLY_TO: process.env['EMAIL_DEFAULT_FROM_REPLY_TO'],
        SMTP_USERNAME: process.env['SMTP_USERNAME'],
        SMTP_PASSWORD: process.env['SMTP_PASSWORD'],
        SMTP_PORT: process.env['SMTP_PORT'],
      },
    },
  ],
};

module.exports = pm2EcosystemConfig;
