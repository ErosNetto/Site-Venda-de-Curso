import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';
import Instrutor from '../models/Instrutor';
import FotoInstrutor from '../models/FotoInstrutor';
import Curso from '../models/Curso';
import FotoCurso from '../models/FotoCurso';
import VideoCurso from '../models/VideoCurso';

const models = [User, Instrutor, FotoInstrutor, Curso, FotoCurso, VideoCurso];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
