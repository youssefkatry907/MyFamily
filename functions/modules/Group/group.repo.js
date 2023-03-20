let Group = require('./group.model');

exports.list = async () => {
    let groups = await Group.find();
    return groups;
}

exports.create = async (form) => {
    let group = new Group(form);
    await group.save();
    return group;
}

exports.get = async (id) => {
    let group = await Group.findById(id);
    return group;
}
