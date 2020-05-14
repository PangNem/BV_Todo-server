import * as http from 'http';
import app from './app';
import { sequelize } from './models/sequelize';
import { Sequelize } from 'sequelize/types';
import logger from './utils/logger';

const stopServer = async (
  server: http.Server,
  sequelize: Sequelize
) => {
  logger.info(`❌ Stopping Server...`);

  server.close();
  await sequelize.close();
};

async function startServer () {
  const HOST: string = app.get('host');
  const PORT: number = app.get('port');

  const server = app.listen(PORT, () => {
    logger.info(`✅ Server is: http://${HOST}:${PORT}`);
  });

  try {
    await sequelize.authenticate();
    await sequelize.sync({
      force: false
    });

  } catch (error) {
    await stopServer(server, sequelize);

    throw error;
  }
}

startServer()
  .then(() => {
    logger.info('Run Succesfully');
  })
  .catch((ex: Error) => {
    logger.error('Unable Run:', ex);
    process.exit();
  });
