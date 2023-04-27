let group = require('../../modules/Group/group.repo');

exports.listGroups = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let parent = jwt.verify(token, "MyFamilyTeam")
        let result = await group.list(parent.familyUserName);
        res.status(200).json({
            success: true,
            code: 200,
            groups: result.groups
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

exports.createGroup = async (req, res) => {
    try {
        let form = req.body;
        let record = await group.create(form);
        res.status(200).json({
            success: true,
            group: record
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

exports.getGroup = async (req, res) => {
    try {
        let id = req.body.id;
        let record = await group.get(id);
        res.status(200).json({
            success: true,
            group: record
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

