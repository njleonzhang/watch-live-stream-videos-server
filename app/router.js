'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/auth/login', 'auth.login')
  app.post('/auth/register', 'auth.register')
};
