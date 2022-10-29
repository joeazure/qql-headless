module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      host: {
        type: Sequelize.STRING
      },
      folderPath: {
          type: Sequelize.STRING
      }
    });

    return Location;
}