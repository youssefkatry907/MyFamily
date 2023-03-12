let Todo = require('./todo.model')


/*
// exports.IsTaskExist = async (arrayOfTasks, task, childId) => {
//     try {
//         let tasks = [];
//         for (let i = 0; i < arrayOfTasks.length; i++) {
//             if (arrayOfTasks[i].childId == childId) {
//                 tasks = arrayOfTasks[i].tasks;
//                 for (let j = 0; j < tasks.length; j++) {
//                     if (tasks[j].taskName == task.taskName) {
//                         return {
//                             success: true,
//                             code: 200
//                         };
//                     }
//                 }
//             }
//         }
//         return {
//             success: true,
//             record: tasks,
//             code: 200
//         };
//     } catch (err) {
//         return {
//             success: false,
//             code: 500,
//             error: "Unexpected Error!"
//         };
//     }
// }
*/

const mongoose = require('mongoose');


exports.isExist = async (filter) => {
    try {
        console.log('filtrate', filter);

        const child = await Todo.findOne({ toDoList: { $elemMatch: { childId: filter.childId } } }).lean();
        console.log('child', child);
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
        console.log('form', form);
        let todo = await this.isExist({ "toDoList.childId": form.childId });
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
                if (newTodo[i].childId == form.childId) {
                    newTodo[i].tasks = newTodo[i].tasks.concat(form.tasks);
                }
            }
            console.log(`add todo`, newTodo);
            await Todo.updateOne({ "toDoList.childId": form.childId }, { $set: { "toDoList": newTodo } });
            return {
                success: true,
                code: 200
            };
        } else {
            // push new childId and tasks into toDoList
            let newTodo = {
                childId: form.childId, // Convert string to ObjectId
                tasks: form.tasks.map(tsk => {
                    return { task: tsk.task, done: tsk.done ?? false }
                })
            }
            console.log(`newTodo`, newTodo);
            let result = await Todo.updateOne({}, { $push: { "toDoList": newTodo } }, { upsert: true, new: true });
            console.log(`newTodo`, newTodo);
            return {
                success: true,
                code: 200
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
