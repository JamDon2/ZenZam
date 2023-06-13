import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";

export interface IUser {
    email: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
});

const User: Model<IUser> = mongoose.models.User || model("User", UserSchema);

export default User;
