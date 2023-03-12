let Todo = require('./todo.model')


exports.getAll = async () => {
    try {
        // return all tasks and populate all children
        const todo = await Todo.find().populate('toDoList.child').lean();
        if (todo) {
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


exports.isExist = async (filter) => {
    try {
        const child = await Todo.findOne(filter).lean();
        if (child) {
            return {
                success: true,
                record: child,
                code: 200
            };
        }
        else {
            return {
                success: false,
                code: 404,
                error: "child is not found!"
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

// add task 

exports.add = async (form) => {
    try {
        // console.log('form', form);
        let todo = await this.isExist({ "toDoList.child": form.child });
        console.log('filter', todo);
        if (todo.code == 500) return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
        if (todo.success) {
            console.log(todo.record);
            let newTodo = todo.record.toDoList;
            for (let i = 0; i < newTodo.length; i++) {
                if (newTodo[i].child == form.child) {
                    newTodo[i].tasks = newTodo[i].tasks.concat(form.tasks);
                }
            }
            await Todo.updateOne({ "toDoList.child": form.child }, { $set: { "toDoList": newTodo } });
            return {
                success: true,
                code: 200
            };
        } else {
            // push new child and tasks into toDoList
            let newTodo = {
                child: form.child, // Convert string to ObjectId
                tasks: form.tasks.map(tsk => {
                    return { task: tsk.task, done: tsk.done ?? false }
                })
            }
            console.log(newTodo, newTodo);
            let result = await Todo.updateOne({}, { $push: { "toDoList": newTodo } }, { upsert: true, new: true });
            console.log(newTodo, newTodo);
            return {
                success: true,
                code: 200
            };
        }
    } catch (err) {
        console.log(err.message, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

