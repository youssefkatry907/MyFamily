const todo = require('../../modules/Todo/todo.model')

exports.addTask = async (req, res) => {
    try {
        const form = req.body;
        const taskExist = await this.IsTaskExist(form.tasks, form.tasks[0].tasks[0], form.tasks[0].childId);
        if (!taskExist.success) {
            const newTask = await todo.addTask(form);
            if (newTask.success) {
                return res.status(201).json({
                    success: true,
                    record: newTask.record
                });
            }
            else {
                return res.status(newTask.code).json({
                    success: false,
                    error: newTask.error
                });
            }
        }
        else {
            return res.status(404).json({
                success: false,
                error: "This task already exists!"
            });
        }
    }catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            error: "Unexpected Error!"
        });
    }
}