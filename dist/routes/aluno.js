"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = _express.Router.call(void 0, );

// Rotas
router.get('/', _AlunoController2.default.index); // Lista todos os ALUNOS
router.get('/:id', _AlunoController2.default.show); // Mostra um ALUNO
router.post('/', _AlunoController2.default.store); // Cria um ALUNO
router.put('/:id', _AlunoController2.default.update); // Edita um ALUNO
router.delete('/:id', _AlunoController2.default.delete); // Deleta um ALUNO

exports. default = router;
