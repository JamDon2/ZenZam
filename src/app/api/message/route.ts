import { z } from "zod";

import zodWrapper from "util/zodWrapper";
import { withDatabase } from "clients/mongoose";

import Message from "models/Message";

const messageSchema = z.strictObject({
    chatId: z.string(),
    fromId: z.string(),
    content: z.string(),
});

export const GET = withDatabase(
    zodWrapper(
        z.null(),
        z.object({ chatId: z.string() }).strict(),
        z.array(messageSchema),
        async (_body, searchParams) => {
            return await Message.find({
                chatId: searchParams.chatId,
            })
                .select("-__v -_id")
                .lean();
        }
    )
);

export const POST = withDatabase(
    zodWrapper(
        messageSchema,
        z.object({}).strict(),
        z.string(),
        async (body) => {
            await Message.create(body);

            return "OK";
        }
    )
);
