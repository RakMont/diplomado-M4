import { Router } from "express";
import tasksController from '../controllers/tasks.controller.js';
const router = Router();

/*router.get('/', (req, res) => {
  res.json({
    message: "HellO FROM tasks ROUTES"
  });
});
router.post('/', (req, res) => {
  res.send('tasks post');
});*/

router.route('/')
  .get(tasksController.getTasks)
  .post( tasksController.createTask);


  router.route('/:id')
    .get(tasksController.getTask)
    .put(tasksController.updateTask)
    .patch(tasksController.taskDone)
    .delete(tasksController.deleteTask);
   

export default router;