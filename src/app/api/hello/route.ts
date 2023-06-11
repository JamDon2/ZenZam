import zodWrapper from "util/zodWrapper";
import { z } from "zod";

export const GET = zodWrapper(z.null(), z.object({ name: z.string() }), () => {
    return { name: "John Doe" };
});
