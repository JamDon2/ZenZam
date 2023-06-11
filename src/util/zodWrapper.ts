import { NextRequest, NextResponse } from "next/server";

export default function zodWrapper(
    input: Zod.ZodTypeAny,
    output: Zod.ZodTypeAny,
    fn: (request: NextRequest) => unknown
) {
    return (request: NextRequest) => {
        if (!input.safeParse(request.body).success) {
            return NextResponse.json(
                { error: "Input validation failed" },
                { status: 400 }
            );
        }

        const result = fn(request);

        if (!output.safeParse(result).success) {
            return NextResponse.json(
                { error: "Output validation failed" },
                { status: 500 }
            );
        }

        return NextResponse.json(result);
    };
}
