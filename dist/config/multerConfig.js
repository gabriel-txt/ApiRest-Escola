"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const rand = () => Math.floor(Math.random() * 10000 + 10000);

exports. default = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') { // Validar tipo de arquivo
      return cb(new _multer2.default.MulterError('Arquivo inválido. Apenas PNG e JPEG são permitidos.'));
    }
    return cb(null, true);
  },
  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => { // Definir pasta de destino da foto
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => { // Definir nome da foto
      cb(null, `${Date.now()}_${rand()}${_path.extname.call(void 0, file.originalname)}`); // Data de upload + Número aleatório + extensão do arquivo -> Normalização dos nomes
    }
  }),
};
