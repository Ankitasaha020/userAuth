import express from 'express';
const router = express.Router();
import checkUserAuth from '../middlewares/auth-middleware.js';
import BlogController from '../controllers/BlogController.js';
//check middleware
router.use('/add-blog-post', checkUserAuth);
//public

//private
router.post('/add-blog-post',BlogController.createBlogpost);
export default router;