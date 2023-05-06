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
            code: 200,
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
    try {
        const newRecord = new Chat(form);
        await newRecord.save();
        return {
            success: true,
            record: newRecord,
            code: 201,
        }
    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.sendMessage = async (msg) => {
    try {
        const chatId = await this.isExist({ _id: req.body.chatId });
        if (chatId.success) {
            const message = {
                sender: msg.sender,
                message: msg.message,
                date: msg.date
            }
            // push message to messages array and update
            let newMessage = await Chat.findOneAndUpdate({ _id: chatId.record._id }, { $push: { messages: message } }, { new: true });
            await newMessage.save();
            return {
                create: false
            }
        }
        else {
            const chat = {
                sender: msg.sender,
                senderName: msg.senderName,
                receiver: msg.receiver,
                lastMessage: msg.message,
                messages: [
                    {
                        sender: msg.sender,
                        receiver: msg.receiver,
                        message: msg.message,
                        date: msg.messageDate
                    }
                ],
                lastMessageDate: msg.messageDate,
                image: msg.image
            }
            let newChat = await this.create(chat);
            return {
                create: true,
                chatId: newChat.record._id
            }
        }
    } catch (err) {
        console.log(err.message, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

exports.remove = async (msgId) => {
    const isFound = await isExist(msgId);
    if (isFound.success) {
        await Chat.findByIdAndDelete({ _id: isFound.record._id })
    }
}