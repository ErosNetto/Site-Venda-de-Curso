import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Curso from '../models/Curso';
import User from '../models/User';
import FotoCurso from '../models/FotoCurso';
import VideoCurso from '../models/VideoCurso';
import Instrutor from '../models/Instrutor';

const models = [Curso, User, FotoCurso, VideoCurso, Instrutor];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
