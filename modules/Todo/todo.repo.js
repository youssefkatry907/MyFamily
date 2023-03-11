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

        let todo = await this.isExist({ "toDoList.childId": form.childId });
        console.log(`todo`, todo);
        if (todo.success) {
            let newTodo = todo.record.toDoList;
            // console.log(`newTodo`, newTodo);
            for (let i = 0; i < newTodo.length; i++) {
                if (newTodo[i].childId == form.childId) {
                    newTodo[i].tasks.push(form.tasks);
                }
            }
            // console.log(`newTodo`, newTodo);
            await Todo.updateOne({ "toDoList.childId": form.childId }, { $set: { "toDoList": newTodo } });
            return {
                success: true,
                code: 200
            };
        }
        else {
            // push new childId and tasks into toDoList
            let newTodo = {
                childId: form.childId,
                tasks: form.tasks
            }
            // console.log(`newTodo`, newTodo);
            await Todo.updateOne({ "toDoList.childId": form.childId }, { $push: { "toDoList": newTodo } });
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

