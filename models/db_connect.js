var promise = require("bluebird");

var options = {
  // Initialization options
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var connectionString = process.env.DATABASE_URL || "postgres://pranjal:password@localhost:5432/pranjal";
module.exports = pgp(connectionString);
