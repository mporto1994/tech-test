import express from 'express';
import * as userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUserById);
userRouter.delete('/:id', userController.deleteUserById);

export default userRouter;
