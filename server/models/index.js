'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[ env ];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    }
  );
  
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

    db.T_member = require('./t_member')(sequelize, Sequelize);
    db.T_memory = require('./t_memory')(sequelize, Sequelize);
    db.T_file = require('./t_file')(sequelize, Sequelize);

    db.T_memory.hasMany(db.T_file, {
      foreignKey: 'memory_idx',
      sourceKey: 'memory_idx'
    });
    db.T_file.belongsTo(db.T_memory, {
      foreignKey: 'memory_idx',
      targetKey: 'memory_idx'
    });
    
db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;