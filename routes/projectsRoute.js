import express from 'express';
import { create, destroy, edit, getOneProject, index } from '../controllers/projectsController.js';
import upload from '../middleware/upload.js';
const router = express.Router();


router.get('/', index);

router.get('/:id', getOneProject);

router.post('/',upload.single('image'), create);


router.put('/:id', edit);


router.delete('/:id', destroy);

export default router;