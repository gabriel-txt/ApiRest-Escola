"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _FotoController = require('../controllers/FotoController'); var _FotoController2 = _interopRequireDefault(_FotoController);

const router = _express.Router.call(void 0, );

// Rotas
router.post('/', _FotoController2.default.store); // Upload de FOTO

exports. default = router;
