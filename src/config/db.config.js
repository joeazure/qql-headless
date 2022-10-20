module.exports = {
    HOST: "localhost",
    USER: "qql",
    PASSWORD: "qql",
    DB: "qql",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };