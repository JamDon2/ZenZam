import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";

export interface IGroup {
    _id: string;
    interests: string[];
    members: string[];
}

const GroupSchema = new Schema<IGroup>({
    _id: {
        type: String,
        required: true,
    },
    interests: {
        type: [String],
        required: true,
    },
    members: {
        type: [{ type: String, ref: "User" }],
        required: true,
    },
});

const Group: Model<IGroup> =
    mongoose.models.Group || model("Group", GroupSchema);

export default Group;
