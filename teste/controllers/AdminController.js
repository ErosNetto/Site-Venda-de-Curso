// import { emit } from 'nodemon';
import Admin from '../models/Admin';

class AdminController {
  async store(req, res) {
    try {
      const novoAdmin = await Admin.create(req.body);
      const { id, nome, email } = novoAdmin;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const admin = await Admin.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(admin);
    } catch (e) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const admin = await Admin.findByPk(req.params.id);

      const { id, nome, email } = admin;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      const admin = await Admin.findByPk(req.adminId);

      if (!admin) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      const novosDados = await admin.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const admin = await Admin.findByPk(req.adminId);

      if (!admin) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      await admin.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AdminController();
