let Todo = require('./todo.model')
let Notification = require('../Notification/notification.model')
let Child = require('../Child/child.model')


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

exports.listTasks = async (childId) => {
    try {
        let todo = await this.isExist({ "toDoList.child": childId });
        if (todo.success) {
            return {
                success: true,
                code: 200,
                tasks: todo.record.toDoList[0].tasks
            }
        }
        else {
            return {
                success: false,
                code: 404,
                error: "todo is not found!"
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

exports.updateTask = async (childId, form) => {
    try {
        let todo = await Todo.findOne({ "toDoList.child": childId });
        if (todo) {
            let taskId = form._id;
            // find the task with the given id and update it
            let updatedTask = todo.toDoList[0].tasks.find(tsk => tsk._id == taskId);
            if (updatedTask) {
                updatedTask.done = form.done;
                await todo.save();

                let child = await Child.findById(childId)
                let email = child.email;
                let atIndex = email.indexOf("@");
                let childName = email.substring(0, atIndex).trim();

                let msg = childName + " " + child.familyUserName + " has completed a task!";
                let newNotification = new Notification({
                    text: msg,
                    type: "todo",
                    date: Date.now()
                })
                await newNotification.save();
                return {
                    success: true,
                    code: 201,
                    message: "task updated successfully!",
                    notification: newNotification
                }
            }
            else {
                return {
                    success: false,
                    code: 404,
                    error: "task is not found!"
                };
            }

        }
        else {
            return {
                success: false,
                code: 404,
                error: "todo is not found!"
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

