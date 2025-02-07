module.exports = (sequelize, Sequelize) => {
    const Render = sequelize.define("render", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      seed_id: {
        type: Sequelize.INTEGER
      },
      backgroundColor: {
          type: Sequelize.STRING
      },
      numColors: {
          type: Sequelize.INTEGER
      },
      numPoints: {
          type: Sequelize.INTEGER
      },
      colorList: {
          type: Sequelize.STRING
      }
    });

    return Render;
}
