import React from "react";
import Navbar from "components/Navbar";
import { GET as userResponse } from "app/api/user/route";
import { GET as groupResponse } from "app/api/group/route";

const chatIds = Array(10)
    .fill(null)
    .map((_, i) => String(1000 + i));

function ErrorPage({ error }: { error: string }) {
    return (
        <div className="bg-zinc-950 h-[100vh] flex justify-center items-center">
            <div className="bg-gray-900 rounded-lg w-full h-full max-w-[450px] max-h-[550px] p-2.5 flex flex-col items-center justify-center gap-2">
                <span className="text-white font-bold text-2xl">{error}</span>
            </div>
        </div>
    );
}

export default async function ChatLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { chatId: string; userId: string };
}) {
    const user = (await (
        await fetch(
            `${process.env.VERCEL_URL || process.env.BASEURL}/api/user?userId=${
                params.userId
            }`,
            {
                cache: "no-store",
            }
        )
    ).json()) as userResponse;

    const group = (await (
        await fetch(
            `${
                process.env.VERCEL_URL || process.env.BASEURL
            }/api/group?groupId=${params.chatId}`
        )
    ).json()) as groupResponse;

    if (!user) {
        return <ErrorPage error="User not found" />;
    }

    if (!group) {
        return <ErrorPage error="Group not found" />;
    }

    if (!group.members.includes(user._id)) {
        return <ErrorPage error="You aren't a member of this group" />;
    }

    return (
        <>
            {user && group ? (
                <>
                    <Navbar
                        basePath={`/user/${params.userId}`}
                        chatIds={user.groups.map((elem) => elem._id)}
                        selected={chatIds.indexOf(params.chatId)}
                    />

                    {children}
                </>
            ) : (
                <>
                    <div className="bg-zinc-950 h-[100vh] flex justify-center items-center">
                        <div className="bg-gray-900 rounded-lg w-full h-full max-w-[450px] max-h-[550px] p-2.5 flex flex-col items-center justify-center gap-2">
                            <span className="text-white font-bold text-2xl">
                                {!user ? "User" : "Group"} not found
                            </span>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
