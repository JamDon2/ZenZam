import { z } from "zod";

import interests from "./interests.json";

import zodWrapper from "util/zodWrapper";

const GETValidator = z.string().array();

export type GET = z.infer<typeof GETValidator>;

export const GET = zodWrapper(
    z.null(),
    z.object({}).strict(),
    GETValidator,
    async () => {
        return interests;
    }
);
