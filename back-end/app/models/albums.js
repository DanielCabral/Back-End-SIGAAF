
module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define('Album', {
      album_titulo: DataTypes.STRING,
      album_descricao: DataTypes.STRING,
      album_data_aquisicao: DataTypes.DATE,
      album_estado_conservacao: DataTypes.STRING,
    });

    Album.associate = models => {
        Album.belongsTo(Library);
    };
    return Library;
  }