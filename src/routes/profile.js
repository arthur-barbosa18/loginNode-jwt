const express = require("express");
const router = express.Router();
const controller_profiles = require("../controllers/profiles");

router.post('/register', controller_profiles.register);
router.get('/', controller_profiles.getAll);
router.get('/:id', controller_profiles.getById);
router.put('/:id', controller_profiles.update);
router.delete('/:id', controller_profiles.delete);

module.exports = router;
