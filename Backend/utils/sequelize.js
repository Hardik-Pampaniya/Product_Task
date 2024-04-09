const Sequelize = require("sequelize");

const sequelize = new Sequelize("product_task", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Not able to connect to the database:", error);
  });

module.exports = sequelize;