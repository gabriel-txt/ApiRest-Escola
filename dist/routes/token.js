"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _TokenController = require('../controllers/TokenController'); var _TokenController2 = _interopRequireDefault(_TokenController);

const router = _express.Router.call(void 0, );

// Rotas
router.post('/', _TokenController2.default.store); // Gera um TOKEN a partir do email e senha do USER

exports. default = router;
