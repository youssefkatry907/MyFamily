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
            code: 200,
            group
        };
    } catch (error) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.get = async (_id) => {
    try {
        let record = Group.findOne({ _id });
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

        let groupId = await this.isExist({ _id: msg.groupId });
        //console.log(groupId);
        if (groupId.success) {
            const message = {
                sender: msg.sender,
                senderName: msg.senderName,
                message: msg.message,
                date: msg.messageDate
            }
            let newMessage = await Group.findOneAndUpdate({ _id: groupId.Group._id }, { $push: { messages: message } }, { new: true });
            await newMessage.save();
            //console.log(newMessage);
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
        // else {
        //     const chat = {
        //         sender: msg.sender,
        //         senderName: msg.senderName,
        //         receiver: msg.receiver,
        //         receiverName: msg.receiverName,
        //         lastMessage: msg.message,
        //         messages: [
        //             {
        //                 sender: msg.sender,
        //                 receiver: msg.receiver,
        //                 message: msg.message,
        //                 date: msg.messageDate
        //             }
        //         ],
        //         lastMessageDate: msg.messageDate,
        //         senderImage: msg.senderImage,
        //         receiverImage: msg.receiverImage
        //     }
        //     console.log(chat);
        //     let newChat = await this.create(chat);
        //     console.log(newChat);
        //     return {
        //         create: true,
        //         groupId: newChat.record._id
        //     }
        // }
    } catch (err) {
        console.log(err.message, err.message);
    }
}
