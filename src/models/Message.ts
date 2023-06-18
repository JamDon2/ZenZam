import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";

export interface IMessage {
    chatId: string;
    fromId: string;
    content: string;
}

const MessageSchema = new Schema<IMessage>({
    chatId: {
        type: String,
        required: true,
    },
    fromId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const Message: Model<IMessage> =
    mongoose.models.Message || model("Message", MessageSchema);

export default Message;
