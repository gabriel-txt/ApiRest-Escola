import { Router } from 'express';
import homeController from '../controllers/HomeController';

const router = Router();

// Rotas
router.get('/', homeController.index); // Página inicial da API

export default router;
