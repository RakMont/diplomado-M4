import logger from "../logs/logger.js"
import bcrypt from 'bcrypt';
import 'dotenv/config'
export const encriptar = async (text) => { 
    try {
        const saltRounds = 10;
        return await bcrypt.hash(text, +process.env.BCRYPT_SALT_ROUNDS);
    } catch (error) {
        logger.error(error.message);
        throw new Error(
        'error al encriptar'
        );
    }
}
export const comparar = async (text, hash) => { 
    try {
        const saltRounds = 10;
        return await bcrypt.compare(text, hash);
    } catch (error) {
        logger.error(error.message);
        throw new Error(
        'error al encriptar'
        );
    }
}