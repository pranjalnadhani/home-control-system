var express = require('express');
var router = express.Router();

var userTable = require("../models/users");

router.get('/', userTable.getAllUsers);
router.get('/:user_id', userTable.getSingleUser);
router.post('/', userTable.createUser);
router.put('/:user_id', userTable.updateUser);
router.delete('/:user_id', userTable.removeUser);

module.exports = router;
