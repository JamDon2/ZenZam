import { NextRequest, NextResponse } from "next/server";

export default function zodWrapper<
    Body extends Zod.ZodTypeAny,
    SearchParams extends Zod.ZodTypeAny,
    Response extends Zod.ZodTypeAny
>(
    body: Body,
    searchParams: SearchParams,
    response: Response,
    fn: (
        request: NextRequest
    ) => Zod.infer<Response> | Promise<Zod.infer<Response>>
) {
    return async (request: NextRequest) => {
        if (!body.safeParse(request.body).success) {
            return NextResponse.json(
                { error: "Input validation failed" },
                { status: 400 }
            );
        }

        if (
            !searchParams.safeParse(
                Object.fromEntries(new URL(request.url).searchParams.entries())
            ).success
        ) {
            return NextResponse.json(
                { error: "Input validation failed" },
                { status: 400 }
            );
        }

        const result = await fn(request);

        const parsedResponse = response.safeParse(result);

        if (!parsedResponse.success) {
            return NextResponse.json(
                { error: "Output validation failed" },
                { status: 500 }
            );
        }

        return NextResponse.json(parsedResponse.data);
    };
}
