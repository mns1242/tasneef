import express from 'express';
import { create, index } from '../controllers/offersController.js';
import upload from '../middleware/upload.js';


const router = express.Router();


router.get('/', index);

router.post('/',upload.single('image'),create);



export default router;