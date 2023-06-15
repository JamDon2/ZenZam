"use client";
import Input from "@mui/joy/Input";
import styles from "styles/Home.module.css";
import React from "react";
import ChatNav from "components/ChatNav";
import Sidebar from "components/Sidebar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { RandomAvatar } from "react-random-avatars";

const test = [
    {
        id: 1,
        message: "Hello",
        sender: "James",
    },
    {
        id: 2,
        message: "Hello",
        sender: "user",
    },
    {
        id: 3,
        message: "What's up?",
        sender: "Dan",
    },
];

export default function Home() {
    const [messages, setMessages] = React.useState(test);
    const [inputValue, setInputValue] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputValue.length > 0) {
                const newMessage = {
                    id: messages.length + 1,
                    message: inputValue,
                    sender: "user",
                };
                setMessages([...messages, newMessage]);
                setInputValue("");
            }
        }
    };
    return (
        <div className={styles.container}>
            <ChatNav />
            <div className="h-[92vh] flex">
                <Sidebar />
                <div className="chatWindow w-full flex-col">
                    <div className="bg-gray-900 p-2.5 h-[9%] flex flex-col">
                        <div className="flex gap-1 font-bold">
                            <div className="rounded-xl text-white px-2 py-0.5 bg-blue-900 bg-opacity-60 w-fit h-fit">
                                #cybersecurity
                            </div>
                            <div className="rounded-xl text-white px-2 py-0.5 bg-blue-900 bg-opacity-60 w-fit h-fit">
                                #baking
                            </div>
                        </div>
                        <div className="px-1.5 text-gray-400 text-sm">
                            3 members
                        </div>
                    </div>
                    <div className="h-[81%] bg-zinc-950 px-10 py-4 overflow-scroll">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.sender === "user"
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
                                        {message.sender !== "user"
                                            ? message.sender
                                            : "You"}
                                    </div>
                                    <div
                                        className={`rounded-full p-2 px-3.5 ${
                                            message.sender === "user"
                                                ? "bg-white text-black"
                                                : "bg-gray-800 text-white mr-2"
                                        }`}
                                    >
                                        {message.message}
                                        {message.sender !== "user" && (
                                            <div
                                                className="w-7 h-7 rounded-full absolute -bottom-1.5 -right-2 flex"
                                                style={{
                                                    imageRendering: "pixelated",
                                                }}
                                            >
                                                <RandomAvatar
                                                    name={message.sender}
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
        </div>
    );
}
