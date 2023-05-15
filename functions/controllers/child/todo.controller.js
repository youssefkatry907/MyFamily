let todo = require('../../modules/Todo/todo.repo');
let checker = require('jsonwebtoken');

exports.list = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let child = checker.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let result = await todo.listTasks(child._id);
        res.status(result.code).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }

}

exports.update = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let child = checker.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let result = await todo.updateTask(child._id, req.body);
        res.status(result.code).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}