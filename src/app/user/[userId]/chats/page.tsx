"use client";

import React from "react";
import Navbar from "components/Navbar";
import { GET } from "app/api/user/route";
import { Button, Divider } from "@mui/joy";
import useSWR from "swr";

import fetcher from "util/fetcher";
import InterestSelector from "components/InterestSelector";

function ErrorPage({ error, userId }: { error: string; userId: string }) {
    return (
        <>
            <Navbar basePath={`/user/${userId}`} chatIds={[]} selected={-1} />
            <div className="bg-zinc-950 h-[92vh] flex items-center justify-center text-white">
                <div className="bg-gray-900 rounded-lg w-full h-full max-w-[450px] max-h-[550px] p-2.5 flex flex-col items-center justify-center gap-2">
                    <div className="bg-gray-800 h-full w-full rounded-lg p-2.5 flex flex-col gap-4 items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                            {error}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function ChatsPage({ params }: { params: { userId: string } }) {
    const {
        data: userData,
        isLoading,
        mutate,
    } = useSWR<GET>(`/api/user?userId=${params.userId}`, fetcher);

    const [interests, setInterests] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (userData?.interests) setInterests(userData.interests);
    }, [userData?.interests]);

    if (isLoading)
        return <ErrorPage error="Loading..." userId={params.userId} />;

    if (!userData && !isLoading)
        return <ErrorPage error="User not found" userId={params.userId} />;

    return (
        <>
            <Navbar
                basePath={`/user/${params.userId}`}
                chatIds={
                    userData ? userData.groups.map((elem) => elem._id) : []
                }
                selected={-1}
            />

            <div className="bg-zinc-950 h-[92vh] flex items-center justify-center text-white">
                <div className="bg-gray-900 rounded-lg w-full h-full max-w-[450px] max-h-[550px] p-2.5 flex flex-col items-center justify-between gap-2">
                    <div className="bg-gray-800 h-full w-full rounded-lg p-2.5 flex flex-col gap-4 justify-center">
                        <InterestSelector
                            onChange={(value) => setInterests(value)}
                            value={interests}
                        />

                        <Button
                            variant="solid"
                            onClick={async () => {
                                await fetch(
                                    `/api/user/updateInterests?userId=${params.userId}`,
                                    {
                                        method: "POST",
                                        body: JSON.stringify(interests),
                                    }
                                );
                            }}
                        >
                            Update interests
                        </Button>

                        <Divider />

                        <Button
                            variant="solid"
                            disabled={userData?.lookingForGroup}
                            onClick={async () => {
                                if (userData)
                                    mutate(
                                        {
                                            ...userData,
                                            lookingForGroup: true,
                                        },
                                        { revalidate: false }
                                    );

                                await fetch(
                                    `/api/group/request?userId=${params.userId}`,
                                    {
                                        method: "POST",
                                    }
                                );

                                mutate();
                            }}
                        >
                            Request new group
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
