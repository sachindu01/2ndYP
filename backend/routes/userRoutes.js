import express from 'express';
import { loginUser,registerUser,adminLogin,getAllUsers, getUserById, deleteUser, changeUserRole } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

userRouter.post('/all',adminAuth, getAllUsers);
userRouter.post('/userid',adminAuth, getUserById);
userRouter.post('/role/userid',adminAuth, changeUserRole);
userRouter.post('/delete',adminAuth, deleteUser); 

export default userRouter;