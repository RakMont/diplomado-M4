import { Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(
    //db name
    //username
    //password
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: console.log
    }
);