import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";

import "models/Group";
import { IGroup } from "models/Group";

export interface IUser {
    _id: string;
    interests: string[];
    groups: IGroup[];
    lookingForGroup: boolean;
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
    lookingForGroup: {
        type: Boolean,
        required: true,
        default: true,
    },
});

UserSchema.virtual("groups", {
    ref: "Group",
    localField: "_id",
    foreignField: "members",
    justOne: false,
});

const User: Model<IUser> = mongoose.models.User || model("User", UserSchema);

export default User;
