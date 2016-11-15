var db = require("./db_connect");

// add functions
module.exports = {
  getAllDevices: getAllDevices,
  getSingleDevice: getSingleDevice,
  createDevice: createDevice,
  updateDevice: updateDevice,
  removeDevice: removeDevice
};

// GET All Todos
function getAllDevices(req, res, next) {
  db.any("SELECT * FROM devices WHERE room_id = $1;", req.params.room_id)
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved all device data for home"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// GET Single Todo
function getSingleDevice(req, res, next) {
  db.one("SELECT * FROM devices WHERE _id = $1", req.params.device_id)
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved device data"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// POST
function createDevice(req, res, next) {
  db.none("INSERT INTO devices (name, home_id) VALUES ($1, $2)", [req.body.name, req.params.home_id])
    .then(function() {
      res.status(200)
        .json({
          status: "success",
          message: "New device added successfully!"
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

// PUT
function updateDevice(req, res, next) {
  db.none("UPDATE devices SET name = $1 WHERE _id = $2", [req.body.name, parseInt(req.params.device_id)])
    .then(function() {
      res.status(200)
        .json({
          status: "success",
          message: "Device details updated successfully!"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// DELETE
function removeDevice(req, res, next) {
  db.result("DELETE FROM devices WHERE _id = $1", req.params.device_id)
    .then(function(result) {
      if(result.rowCount > 0) {
        res.status(200).
          json({
            status: "success",
            message: "Device removed successfully!"
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
