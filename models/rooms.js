var db = require("./db_connect");

// add functions
module.exports = {
  getAllRooms: getAllRooms,
  getSingleRoom: getSingleRoom,
  createRoom: createRoom,
  updateRoom: updateRoom,
  removeRoom: removeRoom
};

// GET All Todos
function getAllRooms(req, res, next) {
  db.any("SELECT * FROM rooms WHERE home_id = $1;", req.params.home_id)
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved all room data for home"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// GET Single Todo
function getSingleRoom(req, res, next) {
  db.one("SELECT * FROM rooms WHERE _id = $1", req.params.room_id)
    .then(function(data) {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: "Retrieved room data"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// POST
function createRoom(req, res, next) {
  db.none("INSERT INTO rooms (name, home_id) VALUES ($1, $2)", [req.body.name, req.params.home_id])
    .then(function() {
      res.status(200)
        .json({
          status: "success",
          message: "New room added successfully!"
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

// PUT
function updateRoom(req, res, next) {
  db.none("UPDATE rooms SET name = $1 WHERE _id = $2", [req.body.name, parseInt(req.params.room_id)])
    .then(function() {
      res.status(200)
        .json({
          status: "success",
          message: "Room details updated successfully!"
        });
    }).catch(function(err) {
      return next(err);
    });
}

// DELETE
function removeRoom(req, res, next) {
  db.result("DELETE FROM rooms WHERE _id = $1", req.params.room_id)
    .then(function(result) {
      if(result.rowCount > 0) {
        res.status(200).
          json({
            status: "success",
            message: "Room removed successfully!"
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
