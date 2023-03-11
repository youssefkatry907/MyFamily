let Todo = require('./todo.model')



exports.IsTaskExist = async (arrayOfTasks, task, childId) => {
    try {
        let tasks = [];
        for (let i = 0; i < arrayOfTasks.length; i++) {
            if (arrayOfTasks[i].childId == childId) {
                tasks = arrayOfTasks[i].tasks;
                for (let j = 0; j < tasks.length; j++) {
                    if (tasks[j].taskName == task.taskName) {
                        return {
                            success: true,
                            code: 200
                        };
                    }
                }
            }
        }
        return {
            success: true,
            record: tasks,
            code: 200
        };
    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}


exports.addTask = async (form) => {
    try {
       const taskExist = await this.IsTaskExist(form.tasks, form.tasks[0].tasks[0], form.tasks[0].childId);
        if (!taskExist.success) {
            const newTodo = new Todo(form);
            await newTodo.save();
            return {
                success: true,
                record: newTodo,
                code: 201
            };
        }
        else {
            return {
                success: false,
                error: "This task already exists!",
                code: 404
            };
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

