var promise = require("bluebird");

var options = {
  // Initialization options
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var connectionString = "postgres://pranjal:password@localhost:5432/pranjal";
// var connectionString = "postgres://smedtolbwvpqgj:Gt_OKCJEFVAqbeR7pDYyzja6u4@ec2-23-21-100-145.compute-1.amazonaws.com:5432/d2f2rlfi71mk07";
module.exports = pgp(connectionString);
