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
  db.none("INSERT INTO devices (type_id, name, state, values, port, room_id) VALUES ($1, $2, $3, $4, $5, $6)", [req.body.type_id, req.body.name, req.body.state, req.body.values, req.body.port, req.params.room_id])
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
  db.none("UPDATE devices SET type_id = $1, name = $2, state = $3, values = $4, port = $5, room_id = $6, updated_at = now() WHERE _id = $7", [parseInt(req.body.type_id), req.body.name, req.body.state, req.body.values, req.body.port, req.body.room_id, parseInt(req.params.device_id)])
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
