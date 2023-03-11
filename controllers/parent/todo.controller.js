const todoRepo = require('../../modules/Todo/todo.repo')

exports.addTask = async (form) => {
    try {
        let todo = await todoRepo.add(form);
        if (todo) {
            // console.log(`newTodo555555555555`, todo);
            return {
                success: true,
                record: todo,
                code: 200
            };
        }
    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}