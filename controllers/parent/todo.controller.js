const todoRepo = require('../../modules/Todo/todo.repo')
const Todo = require('../../modules/Todo/todo.model');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Todo.find();
    console.log(tasks);
    res.status(200).json(
{      toDoList: tasks[0].toDoList,
});
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Unexpected error occurred',
    });
  }
};

exports.addTask = async (req, res) => {
    try {
        let todo = await todoRepo.add(req.body);
        if (todo.code == 200) {
            res.status(200).json({
                success: true,
                message: "Task Added successfully"
            });
        } else{
            res.status(todo.code).json({
                success: todo.success,
                message: todo.error
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}