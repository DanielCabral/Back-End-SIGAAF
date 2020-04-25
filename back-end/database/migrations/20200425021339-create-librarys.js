'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('Librarys', {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          autoIncrement: false,
          unique:true,
      },
    
      library_name: {
        allowNull: false,
        type: DataTypes.STRING,
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Librarys');
  }
};
