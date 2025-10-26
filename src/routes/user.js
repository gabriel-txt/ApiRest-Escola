import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

// Rotas
router.get('/', userController.index); // Mostra todos USERS -> Não deve ser utilizada por Users.
router.get('/:id', userController.show); // Mostra um USER -> Não deve ser utilizada por Users.
router.post('/', userController.create); // Cria um USER
router.put('/', loginRequired, userController.update); // Edita um USER
router.delete('/', loginRequired, userController.delete); // Deleta um USER

export default router;
