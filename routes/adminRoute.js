import express from 'express';
import { adminLogin } from '../controllers/adminAuthController.js';
const router = express.Router();


router.get('/login', adminLogin);



export default router;