module.exports = (sequelize, Sequelize) => {
    const Output = sequelize.define("output", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      location_id: {
          type: Sequelize.INTEGER
      },
      render_id: {
          type: Sequelize.INTEGER
      },
      filename: {
          type: Sequelize.STRING
      },
      pixelWidth: {
          type: Sequelize.INTEGER,
      },
      renderTime: {
          type: Sequelize.DATE
      }
    });

    return Output;
}
