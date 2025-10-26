import multer from 'multer';

import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ errors: [err.code] });
      }
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        const foto = await Foto.create({ originalname, filename, aluno_id});
        const fotoBuscada = await Foto.findByPk(foto.id, { attributes: ['id', 'originalname', 'filename', 'aluno_id']});
        res.json({msg: 'Foto enviada com sucesso!', fotoBuscada});
      } catch (error) {
        return res.status(400).json({errors: ['Aluno com id recebido não existe.']});
      }
    });
  }
}

export default new FotoController();
