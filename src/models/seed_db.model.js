const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("wallet", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      address: {
        type: Sequelize.STRING
      },
      create_date: {
        type: Sequelize.DATE
      }
    });
  
    const Seed = sequelize.define("seed", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      full_hexseed: {
          type: Sequelize.STRING
      },
      wallet_id: {
          type: Sequelize.INTEGER,
      },
      alogrithm_hexseed: {
          type: Sequelize.STRING
      }
    });

    Wallet.hasMany(Seed, {
        foreignKey: 'wallet_id'
      });
    Seed.belongsTo(Wallet);

    return Wallet, Seed;
  };
