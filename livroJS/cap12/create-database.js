const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('.data/editora.db', {dialect: 'sqlite'})

sequelize.sync().then(() => {
  console.log('Banco de Dados criado com sucesso!')
})