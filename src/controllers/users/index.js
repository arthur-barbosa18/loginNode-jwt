const userService = require('../../models/users');
module.exports = {
    reauthenticate,
    authenticate,
    register,
    getCurrent,
    getAll,
    getById,
    update,
    _delete
};

function reauthenticate(req, res, next) {
    userService.reauthenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Id or refresh token is incorrect' }))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(user => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    console.log("OIOIOIO")
    console.log(req.params.id)
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}