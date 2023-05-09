let Group = require('./group.model');
const jwt = require('jsonwebtoken');

exports.isExist = async (_id) => {
    if (!_id) {
        return {
            success: false,
        }
    }
    const record = await Group.findOne({ _id });
    if (record) {
        return {
            success: true,
            code: 200,
            Group: record
        };
    } else {
        return {
            code: 404,
            success: false,
            error: "Group not found!",
        }
    }
}

exports.list = async (familyUserName) => {
    try {
        let groups = await Group.find({ familyUserName });
        return {
            success: true,
            code: 200,
            groups,
        };
    }
    catch (error) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.create = async (form) => {
    try {
        let group = new Group(form);
        await group.save();
        return {
            success: true,
            code: 201,
            group
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.get = async (_id) => {
    try {
        let record = await Group.findOne({ _id });
        return {
            success: true,
            code: 200,
            record
        };
    }
    catch (error) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.sendMessage = async (msg) => {
    try {

        let groupId = await this.isExist({ _id: msg.chatId });
        console.log(groupId);
        if (groupId.success) {
            const message = {
                sender: msg.sender,
                senderName: msg.senderName,
                message: msg.message,
                date: msg.messageDate
            }
            let newMessage = await Group.findOneAndUpdate({ _id: groupId.Group._id }, {
                $push: { messages: message }, $set: {
                    lastMessage: message.message,
                    lastMessageDate: message.messageDate
                }
            }, { new: true });
            await newMessage.save();
            return {
                success: true,
                groupId: groupId.Group._id
            }
        }
        else {
            return {
                success: false
            }
        }
    } catch (err) {
        console.log(err.message, err.message);
    }
}
