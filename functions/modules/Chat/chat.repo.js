let Chat = require('../Chat/chat.model')

exports.isExist = async (_id) => {
    if (!_id) {
        return {
            success: false,
        }
    }
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

exports.find = async (filter) => {
    try {
        const records = await Chat.findOne(filter).lean();
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
        let chatId = { success: false };
        if (msg.chatId) {
            chatId = await this.isExist({ _id: msg.chatId });
        }
        console.log(chatId);
        if (chatId.success) {
            const message = {
                sender: msg.sender,
                message: msg.message,
                date: msg.messageDate
            }
            let newMessage = await Chat.findOneAndUpdate({ _id: chatId.Chat._id }, {
                $push: { messages: message }, $set: {
                    lastMessage: message.message,
                    lastMessageDate: message.messageDate
                }
            }, { new: true });
            await newMessage.save();
            console.log(newMessage);
            return {
                create: false
            }
        }
        else {
            const chat = {
                sender: msg.sender,
                senderName: msg.senderName,
                receiver: msg.receiver,
                receiverName: msg.receiverName,
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
                senderImage: msg.senderImage,
                receiverImage: msg.receiverImage
            }
            console.log(chat);
            let newChat = await this.create(chat);
            console.log(newChat);
            return {
                create: true,
                chatId: newChat.record._id
            }
        }
    } catch (err) {
        console.log(err.message, err.message);
    }
}

exports.remove = async (msgId) => {
    const isFound = await isExist(msgId);
    if (isFound.success) {
        await Chat.findByIdAndDelete({ _id: isFound.record._id })
    }
}