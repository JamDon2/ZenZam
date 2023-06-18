import { z } from "zod";

import zodWrapper from "util/zodWrapper";
import { withDatabase } from "clients/mongoose";

import Message from "models/Message";

export const messageSchema = z.strictObject({
    chatId: z.string(),
    fromId: z.string(),
    content: z.string(),
});

const GETValidator = messageSchema.array();

export type GET = z.infer<typeof GETValidator>;

export const GET = withDatabase(
    zodWrapper(
        z.null(),
        z.object({ chatId: z.string() }).strict(),
        GETValidator,
        async (_body, searchParams) => {
            return await Message.find({
                chatId: searchParams.chatId,
            })
                .select("-__v -_id")
                .lean();
        }
    )
);

const POSTValidator = z.string();

export type POST = z.infer<typeof POSTValidator>;

export const POST = withDatabase(
    zodWrapper(
        messageSchema,
        z.object({}).strict(),
        POSTValidator,
        async (body) => {
            await Message.create(body);

            return "OK";
        }
    )
);
