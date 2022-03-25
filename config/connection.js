const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
// env file link
  if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
    } else {
      sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
          {
          host: 'y5svr1t2r5xudqeq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
          dialect: 'mysql',
          port: 3306
         }
      );
    }

    module.exports = sequelize;

    
