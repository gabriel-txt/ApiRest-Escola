"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('foto');

class FotoController {
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ errors: [err.code] });
      }
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        const foto = await _Foto2.default.create({ originalname, filename, aluno_id});
        const fotoBuscada = await _Foto2.default.findByPk(foto.id, { attributes: ['id', 'originalname', 'filename', 'aluno_id']});
        res.json({msg: 'Foto enviada com sucesso!', fotoBuscada});
      } catch (error) {
        return res.status(400).json({errors: ['Aluno com id recebido não existe.']});
      }
    });
  }
}

exports. default = new FotoController();
