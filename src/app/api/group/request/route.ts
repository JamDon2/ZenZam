import { z } from "zod";

import zodWrapper from "util/zodWrapper";
import { withDatabase } from "clients/mongoose";

import User from "models/User";

const POSTValidator = z.string();

export type POST = z.infer<typeof POSTValidator>;

export const POST = withDatabase(
    zodWrapper(
        z.null(),
        z.object({ userId: z.string() }).strict(),
        POSTValidator,
        async (_body, searchParams) => {
            const user = await User.findById(searchParams.userId);

            if (!user) return "Invalid user";

            if (user.lookingForGroup) return "Already requested";

            user.lookingForGroup = true;

            await user.save();

            return "OK";
        }
    )
);
