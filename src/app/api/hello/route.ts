import { z } from "zod";

import zodWrapper from "util/zodWrapper";
import { withDatabase } from "clients/mongoose";

import User from "models/User";

export const GET = zodWrapper(
    z.null(),
    z.object({ name: z.string(), count: z.number() }),
    withDatabase(async () => {
        return { name: "John Doe", count: await User.countDocuments() };
    })
);
