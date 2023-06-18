"use client";
import Input from "@mui/joy/Input";
import React from "react";
import Sidebar from "components/Sidebar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { RandomAvatar } from "react-random-avatars";
import useSWR from "swr";
import fetcher from "util/fetcher";
import { GET as messageResponse } from "app/api/message/route";
import { GET as groupResponse } from "app/api/group/route";

export default function ChatPage({
    params,
}: {
    params: { chatId: string; userId: string };
}) {
    const { data, mutate } = useSWR<messageResponse>(
        `/api/message?chatId=${params.chatId}`,
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    const { data: groupData, isLoading: isGroupLoading } =
        useSWR<groupResponse>(`/api/group?groupId=${params.chatId}`, fetcher, {
            refreshInterval: 5000,
        });

    const [inputValue, setInputValue] = React.useState("");
    const messageContainer = React.useRef<HTMLDivElement | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputValue.length > 0) {
                const newMessage: messageResponse[0] = {
                    chatId: params.chatId,
                    fromId: params.userId,
                    content: inputValue,
                };

                mutate((data) => data && [...data, newMessage], {
                    revalidate: false,
                });

                setInputValue("");

                (async () => {
                    await fetch("/api/message", {
                        method: "POST",
                        body: JSON.stringify(newMessage),
                    });

                    mutate();
                })();
            }
        }
    };

    React.useEffect(() => {
        if (messageContainer.current) {
            const thresholdPixels = 200;

            const { scrollHeight, scrollTop, offsetHeight } =
                messageContainer.current;

            const nearBottom =
                scrollHeight - (scrollTop + offsetHeight) <= thresholdPixels;

            if (nearBottom) {
                messageContainer.current.lastElementChild?.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    }, [data]);

    if (!groupData && !isGroupLoading) return <h1>Error</h1>;

    return (
        <div className="h-[92vh] flex">
            <Sidebar />
            <div className="chatWindow w-full flex-col">
                <div className="bg-gray-900 p-2.5 h-[9%] flex flex-col">
                    {groupData && (
                        <>
                            <div className="flex gap-1 font-bold">
                                {groupData.interests.map((element, index) => (
                                    <div
                                        className="rounded-xl text-white px-2 py-0.5 bg-blue-900 bg-opacity-60 w-fit h-fit"
                                        key={index}
                                    >
                                        #{element}
                                    </div>
                                ))}
                            </div>
                            <div className="px-1.5 text-gray-400 text-sm">
                                {groupData.members.length} member
                                {groupData.members.length !== 1 && "s"}
                            </div>
                        </>
                    )}
                </div>
                <div
                    className="h-[81%] bg-zinc-950 px-10 py-4 overflow-auto"
                    ref={messageContainer}
                >
                    {data &&
                        data.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.fromId === params.userId
                                        ? "justify-end"
                                        : "justify-start"
                                } mb-2`}
                            >
                                <div className="flex flex-col relative">
                                    <div
                                        className={
                                            "text-xs text-slate-400 px-2"
                                        }
                                    >
                                        {message.fromId !== params.userId
                                            ? message.fromId
                                            : "You"}
                                    </div>
                                    <div
                                        className={`rounded-full p-2 px-3.5 ${
                                            message.fromId === params.userId
                                                ? "bg-white text-black"
                                                : "bg-gray-800 text-white mr-2"
                                        }`}
                                    >
                                        {message.content}
                                        {message.fromId !== params.userId && (
                                            <div
                                                className="w-7 h-7 rounded-full absolute -bottom-1.5 -right-2 flex"
                                                style={{
                                                    imageRendering: "pixelated",
                                                }}
                                            >
                                                <RandomAvatar
                                                    name={message.fromId}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="h-[10%] w-full bg-zinc-900 flex items-center p-1.5 gap-1.5">
                    <AddCircleIcon
                        fontSize={"large"}
                        className="text-zinc-100 hover:text-zinc-400"
                    />
                    <Input
                        placeholder="Type a message"
                        className="w-full text-white hover:text-white bg-gray-800 focus:outline-none"
                        disabled={false}
                        size="md"
                        variant="plain"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        sx={{
                            "& .MuiInput-input": {
                                outline: "none",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
