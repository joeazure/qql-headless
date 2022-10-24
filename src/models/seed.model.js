module.exports = (sequelize, Sequelize) => {
    const Seed = sequelize.define("seed", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      full_hexseed: {
          type: Sequelize.STRING
      },
      wallet_id: {
          type: Sequelize.INTEGER,
      },
      algorithm_hexseed: {
          type: Sequelize.STRING
      }
    });

    return Seed;
}
