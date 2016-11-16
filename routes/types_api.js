var express = require('express');
var router = express.Router({mergeParams: true});

var typeTable = require("../models/types");

router.get('/', typeTable.getAllTypes);
router.get('/:type_id', typeTable.getSingleType);
router.post('/', typeTable.createType);
router.put('/:type_id', typeTable.updateType);
router.delete('/:type_id', typeTable.removeType);

module.exports = router;
