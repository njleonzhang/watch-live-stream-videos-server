'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1507887173585_3166';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    database: 'example-dev',
    host: '127.0.0.1',
    port: '3307',
    username: 'root',
    password: 'test',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  }
  
  return config;
};
