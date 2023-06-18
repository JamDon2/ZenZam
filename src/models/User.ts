import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";

export interface IUser {
    _id: string;
    interests: string[];
    groups: string[];
}

const UserSchema = new Schema<IUser>({
    _id: {
        type: String,
        required: true,
    },
    interests: {
        type: [String],
        required: true,
    },
    groups: {
        type: [String],
        required: true,
    },
});

const User: Model<IUser> = mongoose.models.User || model("User", UserSchema);

export default User;
