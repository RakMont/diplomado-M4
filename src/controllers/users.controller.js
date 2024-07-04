import { Status } from '../constants/index.js';
import logger from '../logs/logger.js';
import { Task } from '../models/task.js';
import { User } from '../models/user.js';
async function getUsers(req, res) {
   try {
       const users = await User.findAll({
           attributes: ['id', 'username', 'password', 'status'],
           order: [
               ['id', 'DESC'],
           ],
           where: {
               status: Status.ACTIVE,
           }
       });
       res.json(users);
    } catch (error) {
        logger.error(error.message)
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
}
async function createUser(req, res) {
    const {username,password} = req.body;
    console.log(username, password);
    try {
        logger.info('User created');
        const user = await User.create({ username, password });
        return res.json(user);
    } catch (error) {
        logger.error(error.message)
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
    //res.send(user);
}

async function getUser(req, res) {
    try {
        const { id } = req.params;
       const user = await User.findOne({
           attributes: ['id', 'username', 'status'],
           where: {
            id: id,
           }
       });
         if (!user) { 
            return res.status(404).json({ message: "User not found"})
        }
       res.json(user);
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message,
        });
    }
}

async function updateUser (req, res) { 
   
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        
        if (!username || !password) { 
            return res.status(400).json({ message: "username and password are required"})
        }
        const user = await User.update(
            {
                username,
                password,
            },
            {
                where: { id },
                individualHooks: true
            }
            
        );
        console.log(user);
        res.json(user);
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message,
        }); 
    }
}

const activeInactive = async (req, res) => { 
    const { id } = req.params;
    const { status } = req.body;
    
    try {
       if (!status) {
        return res.status(500).json({message: 'No existe el status'})
        }
        const user = await User.findByPk(id);
        if (user.status === status) {
            return res.status(200).json({message: `El usuario ya se encuentra ${status}`});
        }
        user.status = status;
        await user.save();
        res.json(user);
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message,
        }); 
    }
}

const  deleteUser = async (req, res) => { 
    const { id } = req.params;
    try {
        await Task.destroy({where:{userId: id}})
        await User.destroy({ where: { id } });

        return res.sendStatus(204);
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message,
        }); 
    }
}


async function getTasks(req, res) { 
    const { id } = req.params;

    try {
        const user = await User.findOne({
            attributes: ['username'],
            where: { id },
            include: [
                {
                    model: Task,
                    as: 'tasks',
                    attributes: ['name', 'done'],
                }
            ]
        })
        res.json(user);
    } catch (error) {
          logger.error(error.message)
        res.status(500).json({
            message: error.message,
        }); 
    }
}
export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    activeInactive,
    deleteUser,
    getTasks
};