var db = require("./db_connect");

// add functions
module.exports = {
  getAllHomes: getAllHomes,
  getSingleHome: getSingleHome,
  createHome: createHome,
  updateHome: updateHome,
  removeHome: removeHome
};

// GET All Todos
function getAllHomes(req, res, next) {
  db.any("SELECT * FROM homes WHERE user_id = $1;", req.params.user_id)
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved all homes for user"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// GET Single Todo
function getSingleHome(req, res, next) {
  db.one("SELECT * FROM homes WHERE _id = $1", req.params.home_id)
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved home data"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// POST
function createHome(req, res, next) {
  db.none("INSERT INTO homes (name, address, user_id) VALUES ($1, $2, $3)", [req.body.name, req.body.address, parseInt(req.params.user_id)])
    .then(function() {
      res.status(200)
        .json({
          status: "success",
          message: "New home added successfully!"
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

// PUT
function updateHome(req, res, next) {
  db.none("UPDATE homes SET name = $1, address = $2 WHERE _id = $3", [req.body.name, req.body.address, parseInt(req.params.home_id)])
    .then(function() {
      res.status(200)
        .json({
          status: "success",
          message: "Home details updated successfully!"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// DELETE
function removeHome(req, res, next) {
  db.result("DELETE FROM homes WHERE _id = $1", req.params.home_id)
    .then(function(result) {
      if(result.rowCount > 0) {
        res.status(200).
          json({
            status: "success",
            message: "Home details successfully!"
          });
      } else {
        res.status(200).
          json({
            status: "error",
            message: "No todo deleted!"
          });
      }
    }).catch(function(err) {
      return next(err);
    });
}
