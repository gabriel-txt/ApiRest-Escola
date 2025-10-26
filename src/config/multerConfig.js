import multer from "multer";
import { resolve, extname } from 'path';

const rand = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') { // Validar tipo de arquivo
      return cb(new multer.MulterError('Arquivo inválido. Apenas PNG e JPEG são permitidos.'));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => { // Definir pasta de destino da foto
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => { // Definir nome da foto
      cb(null, `${Date.now()}_${rand()}${extname(file.originalname)}`); // Data de upload + Número aleatório + extensão do arquivo -> Normalização dos nomes
    }
  }),
};
