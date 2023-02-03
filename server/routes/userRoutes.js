import express from 'express';
const router = express.Router();
import UserContoller from '../controllers/UserController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

//two type of routes 1. public routes and 2. private routes
// check user midleware routes
router.use('/changePassword',checkUserAuth);

//public routes
router.post('/register',UserContoller.userResgistration);//when we insert value use post method
router.post('/login',UserContoller.userLogin);//when we insert value use post method

//private routes
router.post('/changePassword',UserContoller.changePassword);


export default router;