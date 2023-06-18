import { z } from "zod";

import zodWrapper from "util/zodWrapper";
import { withDatabase } from "clients/mongoose";

import User from "models/User";

const POSTValidator = z.string();

export type POST = z.infer<typeof POSTValidator>;

export const POST = withDatabase(
    zodWrapper(
        z.string().array(),
        z.object({ userId: z.string() }).strict(),
        POSTValidator,
        async (body, searchParams) => {
            const user = await User.findById(searchParams.userId);

            if (!user) return "User not found";

            user.interests = body;

            await user.save();

            return "OK";
        }
    )
);
