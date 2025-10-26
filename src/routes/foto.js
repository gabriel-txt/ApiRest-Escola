import { Router } from 'express';

import fotoController from '../controllers/FotoController';

const router = Router();

// Rotas
router.post('/', fotoController.store); // Upload de FOTO

export default router;
