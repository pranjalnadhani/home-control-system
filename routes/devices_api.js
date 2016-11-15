var express = require('express');
var router = express.Router({mergeParams: true});

var deviceTable = require("../models/devices");

router.get('/', deviceTable.getAllDevices);
router.get('/:device_id', deviceTable.getSingleDevice);
router.post('/', deviceTable.createDevice);
router.put('/:device_id', deviceTable.updateDevice);
router.delete('/:device_id', deviceTable.removeDevice);

module.exports = router;
