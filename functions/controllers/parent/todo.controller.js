const todoRepo = require('../../modules/Todo/todo.repo')
let jwt = require('jsonwebtoken');

exports.addTask = async (req, res) => {
    try {
        let todo = await todoRepo.add(req.body);
        if (todo.code == 200) {
            res.status(200).json({
                success: true,
                message: "Task Added successfully"
            });
        } else {
            res.status(todo.code).json({
                success: todo.success,
                message: todo.error
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Unexpected Error!"
        });
    }
}

exports.getTasks = async (req, res) => {
    // return all tasks and populate all children
    try {
        let token = req.headers.authorization.split(' ')[1];
        let parent = jwt.verify(token, "MyFamilyTeam")
        let todo = await todoRepo.getAll(parent._id);
        if (todo.success) {

            return res.status(200).json(todo);
        }
        else {
            return res.status(404).json({
                success: false,
                error: "todo is not found!"
            });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: "Unexpected Error!"
        });
    }
}