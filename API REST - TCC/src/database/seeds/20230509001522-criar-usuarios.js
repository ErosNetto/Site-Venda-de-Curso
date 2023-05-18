const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        nome: 'Jonas 1',
        email: 'jonas1@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Jonas 2',
        email: 'jonas2@gmail.com',
        password_hash: await bcryptjs.hash('23434234', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Jonas 3',
        email: 'jonas3@gmail.com',
        password_hash: await bcryptjs.hash('82331662', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down() {},
};
