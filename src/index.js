import app from './app.js';
import 'dotenv/config';
import logger from './logs/logger.js';
import { sequelize } from './database/database.js';
async function main() {
    await  sequelize.sync({
    force: false})

    const port = process.env.PORT;
    app.listen(port);
    console.log(`Server is running on port ${port}`);
    logger.info(`Starting server on port ${port}`);
    //logger.warn(`Starting server on port ${port}`);
    //logger.error(`Starting server on port ${port}`);

}
main();