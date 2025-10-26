require('dotenv').config({quiet: true});
import { resolve } from 'path';

import './database/db'; // Executa a configuração do banco de dados
import express from 'express';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import alunoRoutes from './routes/aluno';
import fotoRoutes from './routes/foto';
import loginRequired from './middlewares/loginRequired';
import './models/associations';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express. json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', loginRequired, alunoRoutes);
    this.app.use('/fotos/', loginRequired, fotoRoutes);
  }
}

export default new App().app; // Exporta a instância do app já criada
