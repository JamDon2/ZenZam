import { z } from "zod";
import { v4 } from "uuid";

import zodWrapper from "util/zodWrapper";
import { withDatabase } from "clients/mongoose";

import User from "models/User";

import { groupSchema } from "../group/route";

export const userSchema = z.strictObject({
    _id: z.string(),
    interests: z.string().array(),
    groups: groupSchema.array(),
    lookingForGroup: z.boolean(),
});

const GETValidator = userSchema.nullable();

export type GET = z.infer<typeof GETValidator>;

export const GET = withDatabase(
    zodWrapper(
        z.null(),
        z.object({ userId: z.string() }).strict(),
        GETValidator,
        async (_body, searchParams) => {
            const doc = await User.findOne({
                _id: searchParams.userId,
            })
                .select("-__v")
                .populate("groups", "-__v");

            if (!doc) return null;

            const result = doc.toObject();

            return {
                ...result,
                groups: JSON.parse(JSON.stringify(doc.groups)),
            };
        }
    )
);

const POSTValidator = z.string();

export type POST = z.infer<typeof POSTValidator>;

export const POST = withDatabase(
    zodWrapper(
        z.string().array(),
        z.object({}).strict(),
        POSTValidator,
        async (body) => {
            const uuid = v4();

            await User.create({
                _id: uuid,
                groups: [],
                interests: body,
                lookingForGroup: true,
            });

            return uuid;
        }
    )
);
