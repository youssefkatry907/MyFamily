let Todo = require('./todo.model')


exports.getAll = async (familyUserName) => {
    try {
        // return all tasks and populate all children
        const todo = await Todo.find().populate('toDoList.child').lean();
        let sz = todo[0].toDoList.length;
        let todoList = [];
        for (let i = 0; i < sz; i++) {
            if (todo[0].toDoList[i].child.familyUserName == familyUserName) {
                todoList.push(todo[0].toDoList[i]);
            }
        }
        console.log(todoList.length);
        
        if (todoList.length > 0) {
            console.log(todoList.length);
            return {
                success: true,
                toDoList: todoList,
                code: 200
            };
        }
        return {
            success: false,
            code: 404,
            error: "todo is not found!"
        };
    } catch (err) {
        console.log(err.message);
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



exports.add = async (form) => {
    try {
        let todo = await this.isExist({ "toDoList.child": form.child });
        if (todo.code == 500) return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
        if (todo.success) {
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
            let result = await Todo.updateOne({}, { $push: { "toDoList": newTodo } }, { upsert: true, new: true });
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

