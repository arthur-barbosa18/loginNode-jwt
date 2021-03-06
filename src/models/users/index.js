const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../databases");
randtoken = require('rand-token');
const User = db.User;

module.exports = {
    reauthenticate,
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    // verifica se passou usuario e senha corretos no login
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        const refreshToken = randtoken.uid(100);
        user.refresh_token = refreshToken;
        user.save();
        return {
            ...userWithoutHash,
            token,
            refreshToken
        };
    }
}

async function reauthenticate({ id, renew_token }) {
    const user = await User.findById(id);
    // verifica se passou usuario e senha corretos no login
    if(user.refresh_token == renew_token) {
        const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        const { hash, ...userWithoutHash } = user.toObject();
        const refreshToken = randtoken.uid(100);
        user.refresh_token = refreshToken;
        return {
            userWithoutHash,
            token,
            refreshToken
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    // validate
    const user = await User.findById(id);
    if (!user || user.deletion_logic == true) throw "User not found";
    return await User.findById(id).select("-hash");
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
        user.created_at = Date.now();
        user.updated_at = Date.now();
    }

    // save user_del
    await user.save();

}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user || user.deletion_logic == true) throw "User not found";
    if (
        user.username !== userParam.username &&
        (await User.findOne({ username: userParam.username }))
    ) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    const user = await User.findById(id);
    user.deletion_logic = true;
    user.deleted_at = Date.now();
    await user.save()
    //await User.findByIdAndRemove(id);
}
