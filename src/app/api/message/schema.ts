import { z } from "zod";

export const messageSchema = z.strictObject({
    chatId: z.string(),
    fromId: z.string(),
    content: z.string(),
});
