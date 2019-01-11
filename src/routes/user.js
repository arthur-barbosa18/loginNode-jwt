const express = require("express");
const router = express.Router();
const controller_users = require("../controllers/users");

router.post('/authenticate', controller_users.authenticate);
router.post('/register', controller_users.register);
router.get('/current', controller_users.getCurrent);
router.get('/:id', controller_users.getById);
router.put('/:id', controller_users.update);
router.delete('/:id', controller_users._delete);

module.exports = router;
