var express = require('express');
var router = express.Router({mergeParams: true});

var homeTable = require("../models/homes");

router.get('/', homeTable.getAllHomes);
router.get('/:home_id', homeTable.getSingleHome);
router.post('/', homeTable.createHome);
router.put('/:home_id', homeTable.updateHome);
router.delete('/:home_id', homeTable.removeHome);

module.exports = router;
