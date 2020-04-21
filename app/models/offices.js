module.exports = (sequelize, DataTypes) => {
    const Office = sequelize.define('Office', {
      office_nome: DataTypes.STRING,
    });
    return Office;
  }