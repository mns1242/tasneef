import express from 'express';
import { index, termsIndex } from '../controllers/homeController.js';

const router = express.Router();


router.get('/', index);

router.get('/terms', termsIndex);



export default router;