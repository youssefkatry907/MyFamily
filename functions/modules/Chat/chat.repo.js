let Chat = require('../Chat/chat.model')

exports.isExist = async (_id) => {
    const record = await Chat.findOne({ _id });
    if (record) {
        return {
            success: true,
            code: 200,
            Chat: record
        };
    } else {
        return {
            code: 404,
            success: false,
            error: "Chat not found!",
        }
    }
}

exports.get = async (_id) => {
    if (_id) return await this.isExist(_id);
    else {
        return {
            success: false,
            code: 400,
            errors: "Id is required!"
        }
    }
}

exports.list = async (filter) => {
    try {
        const records = await Chat.find(filter).lean();
        return {
            success: true,
            code:200,
            records,
        };

    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.create = async (form) => {
    const newRecord = new Chat(form);
    await newRecord.save();
    return {
        success: true,
        record: newRecord,
        code: 200,
    }
}

exports.remove = async (msgId) => {
    const isFound = await isExist(msgId);
    if (isFound.success) {
        await Chat.findByIdAndDelete({ _id: isFound.record._id })
    }
}