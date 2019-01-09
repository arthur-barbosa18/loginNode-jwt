const profileService = require('../models/profiles');
module.exports = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function register(req, res, next) {
    console.log(req.body)
    profileService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    profileService.getAll()
        .then(profiles => res.json(profiles))
        .catch(err => next(err));
}

function getById(req, res, next) {
    profileService.getById(req.params.id)
        .then(profile => profile ? res.json(profile) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    profileService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    profileService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}