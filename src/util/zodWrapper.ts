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
        body: Zod.infer<Body>,
        searchParams: Zod.infer<SearchParams>,
        request: NextRequest
    ) => Zod.infer<Response> | Promise<Zod.infer<Response>>
) {
    return async (request: NextRequest) => {
        let bodyJSON: Zod.infer<Body> | null;

        try {
            bodyJSON = JSON.parse(await request.text());
        } catch {
            bodyJSON = null;
        }

        const parsedBody = body.safeParse(bodyJSON);

        if (!parsedBody.success) {
            return NextResponse.json(
                { error: "Input validation failed" },
                { status: 400 }
            );
        }

        const parsedSearchParams = searchParams.safeParse(
            Object.fromEntries(new URL(request.url).searchParams.entries())
        );

        if (!parsedSearchParams.success) {
            return NextResponse.json(
                { error: "Input validation failed" },
                { status: 400 }
            );
        }

        const result = await fn(
            parsedBody.data,
            parsedSearchParams.data,
            request
        );

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
