import User from '../models/User';

export default async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (user.istrutor === false) {
      return res.status(400).json({
        errors: ['Voce precisa ser um intrutor para acessar!'],
      });
    }

    return next();
  } catch (e) {
    return res.status(400).json({
      errors: ['Erro desconhecido'],
    });
  }
};
