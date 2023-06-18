import React from "react";
import Navbar from "components/Navbar";
import { GET } from "app/api/user/route";

const chatIds = Array(10)
    .fill(null)
    .map((_, i) => String(1000 + i));

export default async function ChatLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { chatId: string; userId: string };
}) {
    const result = (await (
        await fetch(`${process.env.BASEURL}/api/user?userId=${params.userId}`, {
            cache: "no-store",
        })
    ).json()) as GET;

    return (
        <>
            {result ? (
                <>
                    <Navbar
                        basePath={`/user/${params.userId}`}
                        chatIds={result.groups}
                        selected={chatIds.indexOf(params.chatId)}
                    />

                    {children}
                </>
            ) : (
                <>
                    {" "}
                    <div className="bg-zinc-950 h-[100vh] flex justify-center items-center">
                        <div className="bg-gray-900 rounded-lg w-full h-full max-w-[450px] max-h-[550px] p-2.5 flex flex-col items-center justify-center gap-2">
                            <span className="text-white font-bold text-2xl">
                                User not found
                            </span>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
