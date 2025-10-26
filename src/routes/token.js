import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const router = Router();

// Rotas
router.post('/', TokenController.store); // Gera um TOKEN a partir do email e senha do USER

export default router;
