import express from 'express';
import { buildingManagementIndex, carWashIndex, index } from '../controllers/serviceController.js';

const router = express.Router();


router.get('/', index);
router.get('/building-management', buildingManagementIndex);
router.get('/car-washing', carWashIndex);



export default router;