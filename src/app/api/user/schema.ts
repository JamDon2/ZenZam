import { z } from "zod";
import { groupSchema } from "../group/schema";

export const userSchema = z.strictObject({
    _id: z.string(),
    interests: z.string().array(),
    groups: groupSchema.array(),
    lookingForGroup: z.boolean(),
});
