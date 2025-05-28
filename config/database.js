require('dotenv').config(); // charge les variables d'env depuis .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,     // nom de la base
  process.env.DB_USER,     // utilisateur
  process.env.DB_PASSWORD,     // mot de passe
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,        // désactive les logs SQL (mettre true si besoin)
  }
);

module.exports = sequelize;
