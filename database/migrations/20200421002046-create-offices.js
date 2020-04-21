module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Offices', {
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
     
      office_nome: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Offices');
  }
};