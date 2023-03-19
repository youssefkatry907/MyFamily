let Chat = require('../Chat/chat.model')

exports.isExist = async (id) => {
    const record = await Chat.findOne({ _id: id });
    if (record) {
        return {
            success: true,
            record: record,
            code: 200,
        };
    } else {
        return {
            code: 404,
            success: false,
            errors: [
                {
                    key: "record",
                    value: `record not found`,
                },
            ],
        };
    }
}

exports.get = async (id) => {
    if (id) return await isExist(id);
    else {
        return {
            success: false,
            code: 400,
            errors: [
                {
                    key: "id",
                    value: `id is missed`,
                },
            ],
        };
    }
}

exports.list = async (query) => {
    const records = await Chat.find(query);
    return records;
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