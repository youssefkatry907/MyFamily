let Child = require('./child.model')

exports.getAll = async () => {
    const children = await Child.find()
    return children
}