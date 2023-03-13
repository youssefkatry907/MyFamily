let child = require('../../modules/Child/child.repo')

exports.getChildren = async (req, res) => {
    const children = await child.getAll()
    res.status(200).json({ success: true, code: 200, children })
}