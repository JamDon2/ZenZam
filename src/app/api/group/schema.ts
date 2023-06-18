import { z } from "zod";

export const groupSchema = z.strictObject({
    _id: z.string(),
    interests: z.string().array(),
    members: z.string().array(),
});
