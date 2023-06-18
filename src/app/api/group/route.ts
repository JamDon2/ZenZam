import { z } from "zod";

import zodWrapper from "util/zodWrapper";
import { withDatabase } from "clients/mongoose";

import Group from "models/Group";

export const groupSchema = z.strictObject({
    _id: z.string(),
    interests: z.string().array(),
    members: z.string().array(),
});

const GETValidator = groupSchema.nullable();

export type GET = z.infer<typeof GETValidator>;

export const GET = withDatabase(
    zodWrapper(
        z.null(),
        z.object({ groupId: z.string() }).strict(),
        GETValidator,
        async (_body, searchParams) => {
            return await Group.findOne({
                _id: searchParams.groupId,
            })
                .select("-__v")
                .lean();
        }
    )
);
