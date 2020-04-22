module.exports = (sequelize, DataTypes) => {
    const Office = sequelize.define('Office', {
      office_name: DataTypes.STRING,
    });
    return Office;
  }