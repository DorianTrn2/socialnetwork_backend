const messageService = require("../services/messageService");
const Message = require("../models/Message");

/**
 * Get all existing messages. Send http status `200` if request is successful, `404` on null object received or `500` on
 * internal server error.
 *
 * @param req
 * @param res
 * @returns all existing messages on success
 */
async function getAllMessages(req, res) {
    try {
        const messages = await messageService.getAllMessages();

        if (messages === null) {
            return res.status(404).json({message: 'Error - received object is null'});
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

/**
 * Add a message in the database and emit it to the websockets. Send http status `201` if request is successful, `404`
 * on null object received or `500` on internal server error.
 *
 * @param req
 * @param res
 * @returns the newly created message
 */
async function addMessage(req, res) {
    try {
        const {message} = req.body;
        const {chat_id, userEmail} = req;

        const messageToAdd = new Message({
            sender_email: userEmail,
            date: new Date(),
            chat_id,
            message
        });

        const newMessage = await messageService.addMessage(messageToAdd);

        if (newMessage === null) {
            return res.status(404).json({message: 'Error - received object is null => not inserted'});
        }

        req.io.to(chat_id).emit("new_message", newMessage);

        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    getAllMessages,
    addMessage,
}
