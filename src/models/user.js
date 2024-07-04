import {sequelize } from '../database/database.js';
import { Status } from "../constants/index.js";
import { Task } from './task.js';
import { DataTypes } from 'sequelize';
import logger from '../logs/logger.js';
import { encriptar } from '../common/bcrypt.js';

export const User = sequelize.define('users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull:{
                    msg:'Ingrese nombre de usuario'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg:'Ingrese contraseña'
                }
            },
        },
         status: {
            type: DataTypes.STRING,
            defaultValue: Status.ACTIVE,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[Status.ACTIVE, Status.INACTIVE]],
                    msg: `El estado debe ser ${Status.ACTIVE} o ${Status.INACTIVE}`
                }
            },
        }
    }
    
);
//ralacion 1 a muchos
User.hasMany(Task)
Task.belongsTo(User);
/*
User.hasMany(Task, {
    foreignKey:  'user_id',
    sourceKey: 'id'
    
})
Task.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
})*/

User.beforeCreate(async (user) => { 
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error(
        'error al encriptar beforeCreate'
        );
    }
})
User.beforeUpdate(async (user) => { 
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error(
        'error al encriptar beforeUpdate'
        );
    }
})