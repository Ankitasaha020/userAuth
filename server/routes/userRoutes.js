import express from 'express';
const router = express.Router();
import UserContoller from '../controllers/UserController.js';

//two type of routes 1. public routes and 2. private routes

//public routes
router.post('/register',UserContoller.userResgistration);//when we insert value use post method
router.post('/login',UserContoller.userLogin);//when we insert value use post method

//private routes


export default router;