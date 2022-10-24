module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("wallet", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      address: {
        type: Sequelize.STRING
      }
    });

    return Wallet;
  };

