var db = require("./db_connect");

// add functions
module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};

// GET All Users
function getAllUsers(req, res, next) {
  db.any("SELECT * FROM users;")
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved all users"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// GET Single User
function getSingleUser(req, res, next) {
  var user_id = parseInt(req.params.user_id);
  db.one("SELECT * FROM users WHERE _id = $1", user_id)
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved one user"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// POST
function createUser(req, res, next) {
  db.one("SELECT * FROM users WHERE username = ${username} OR email = ${email} OR mobile_no = ${mobile_no}", req.body)
    .then(function(data) {
      res.status(200)
        .json({
          status: "error",
          data: data,
          message: "User already exists!"
        });
    }).catch(function(err) {
      db.none("INSERT INTO users (username, password, email, mobile_no, first_name, last_name) VALUES (${username}, ${password}, ${email}, ${mobile_no}, ${first_name}, ${last_name})", req.body)
        .then(function() {
          res.status(200)
            .json({
              status: "success",
              message: "User created successfully!"
            });
        })
        .catch(function(err) {
          return next(err);
        });
    });
}

// PUT
function updateUser(req, res, next) {
  db.none("UPDATE users SET email = $1, password = $2, first_name = $3, last_name = $4, mobile_no = $5 WHERE _id = $6", [req.body.email, req.body.password, req.body.first_name, req.body.last_name, req.body.mobile_no, parseInt(req.params.user_id)])
    .then(function() {
      res.status(200)
        .json({
          status: "success",
          message: "User updated successfully!"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// DELETE
function removeUser(req, res, next) {
  db.result("DELETE FROM users WHERE _id = $1", req.params.user_id)
    .then(function(result) {
      if(result.rowCount > 0) {
        res.status(200).
          json({
            status: "success",
            message: "User deleted successfully!"
          });
      } else {
        res.status(200).
          json({
            status: "error",
            message: "No user deleted!"
          });
      }
    }).catch(function(err) {
      return next(err);
    });
}
