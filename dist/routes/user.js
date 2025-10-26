"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = _express.Router.call(void 0, );

// Rotas
router.get('/', _UserController2.default.index); // Mostra todos USERS -> Não deve ser utilizada por Users.
router.get('/:id', _UserController2.default.show); // Mostra um USER -> Não deve ser utilizada por Users.
router.post('/', _UserController2.default.create); // Cria um USER
router.put('/', _loginRequired2.default, _UserController2.default.update); // Edita um USER
router.delete('/', _loginRequired2.default, _UserController2.default.delete); // Deleta um USER

exports. default = router;
