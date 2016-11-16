var db = require("./db_connect");

// add functions
module.exports = {
  getAllTypes: getAllTypes,
  getSingleType: getSingleType,
  createType: createType,
  updateType: updateType,
  removeType: removeType
};

// GET All Todos
function getAllTypes(req, res, next) {
  db.any("SELECT * FROM types")
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved all type data"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// GET Single Todo
function getSingleType(req, res, next) {
  db.one("SELECT * FROM types WHERE _id = $1", req.params.type_id)
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved type data"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// POST
function createType(req, res, next) {
  db.none("INSERT INTO types (name, default_title, brand, sensor, values) VALUES (${name}, ${default_title}, ${brand}, ${sensor}, ${values})", req.body)
    .then(function() {
      res.status(200)
        .json({
          status: "success",
          message: "New type added successfully!"
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

// PUT
function updateType(req, res, next) {
  db.none("UPDATE types SET name = $1, default_title = $2, brand = $3, sensor = $4 values = $5 WHERE _id = $6", [req.body.name, req.body.default_title, req.body.brand, req.body.sensor, req.body.values, parseInt(req.params.type_id)])
    .then(function() {
      res.status(200)
        .json({
          status: "success",
          message: "Type details updated successfully!"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// DELETE
function removeType(req, res, next) {
  db.result("DELETE FROM types WHERE _id = $1", req.params.type_id)
    .then(function(result) {
      if(result.rowCount > 0) {
        res.status(200).
          json({
            status: "success",
            message: "Type removed successfully!"
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
