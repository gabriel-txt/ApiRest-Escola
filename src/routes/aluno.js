import { Router } from 'express';
import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

// Rotas
router.get('/', alunoController.index); // Lista todos os ALUNOS
router.get('/:id', alunoController.show); // Mostra um ALUNO
router.post('/', alunoController.store); // Cria um ALUNO
router.put('/:id', alunoController.update); // Edita um ALUNO
router.delete('/:id', alunoController.delete); // Deleta um ALUNO

export default router;
