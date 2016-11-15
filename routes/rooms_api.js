var express = require('express');
var router = express.Router({mergeParams: true});

var roomTable = require("../models/rooms");

router.get('/', roomTable.getAllRooms);
router.get('/:room_id', roomTable.getSingleRoom);
router.post('/', roomTable.createRoom);
router.put('/:room_id', roomTable.updateRoom);
router.delete('/:room_id', roomTable.removeRoom);

module.exports = router;
