import mongoose from "mongoose";

export default async function mongooseConnect() {
    return await mongoose.connect(process.env.MONGODB_URI as string, {
        dbName: process.env.MONGODB_DATABASE,
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withDatabase<T extends (...args: any[]) => any>(
    fn: T
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
    return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
        await mongooseConnect();

        return await fn(...args);
    };
}
