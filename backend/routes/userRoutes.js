import express from 'express';
import { loginUser,registerUser,adminLogin,getAllUsers, getUserById, deleteUser, changeUserRole } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

userRouter.post('/all',adminAuth, getAllUsers);
userRouter.delete('/:id', deleteUser); 
userRouter.patch('/role/:id', changeUserRole);

userRouter.get('/:id', getUserById); 


export default userRouter;