'use strict';

module.exports = {
  up: async function (db, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize;

    await db.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: STRING,
        unique: true
      },
      cellphone: {
        type: STRING,
        unique: true
      },
      idNumber: {
        type: STRING,
        unique: true
      },
      password: STRING,
      created_at: DATE,
      updated_at: DATE
    })
  },

  down: async function (db, Sequelize) {
    await db.dropTable('users')
  }
};
