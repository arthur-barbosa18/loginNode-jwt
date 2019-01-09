const config = require("../../config.json");
const db = require("../../config/database");
const Profile = db.Profile;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Profile.find();
}

async function getById(id) {
    return await Profile.findById(id);
}

async function create(profileParam) {
    // validate
    if (await Profile.findOne({ profilename: profileParam.profilename })) {
        throw 'ProfileName "' + profileParam.profilename + '" is already taken';
    }

    const profile = new Profile(profileParam);

    profile.created_at = Date.now();
    profile.updated_at = Date.now();
    

    // save profile_del
    await profile.save();
}

async function update(id, profileParam) {
    const profile = await Profile.findById(id);

    // validate
    if (!profile) throw "User not found";
    if (
        profile.profilename !== profileParam.profilename &&
        (await Profile.findOne({ profilename: profileParam.profilename }))
    ) {
        throw 'Profilename "' + profileParam.profilename + '" is already taken';
    }

    // copy profileParam properties to profile
    Object.assign(profile, profileParam);

    await profile.save();
}

async function _delete(id) {
    await Profile.findByIdAndRemove(id);
}
