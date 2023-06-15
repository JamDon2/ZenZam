"use client";
import Input from "@mui/joy/Input";
import styles from "styles/Home.module.css";
import gradient from "random-gradient";
import React from "react";
import ChatNav from "components/ChatNav";
import SideBar from "components/SideBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
            const newMessage = {
                id: messages.length + 1,
                message: inputValue,
                sender: "user",
            };
            setMessages([...messages, newMessage]);
            setInputValue("");
        }
    };
    return (
        <div className={styles.container}>
            <ChatNav />
            <div className="h-[92vh] flex">
                <SideBar />
                <div className="chatWindow w-full flex-col">
                    <div className="bg-slate-700 p-2.5 h-[9%] flex flex-col">
                        <div className="flex gap-1 font-bold">
                            <div className="rounded-xl text-white px-2 py-0.5 bg-blue-800 bg-opacity-60 w-fit h-fit">
                                #cybersecurity
                            </div>
                            <div className="rounded-xl text-white px-2 py-0.5 bg-blue-800 bg-opacity-60 w-fit h-fit">
                                #baking
                            </div>
                        </div>
                        <div className="px-1.5 text-gray-400 text-sm">
                            3 members
                        </div>
                    </div>
                    <div className="h-[81%] bg-zinc-900 px-10 py-4">
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
                                        className={`text-xs px-2 ${
                                            message.sender === "user" &&
                                            "hidden"
                                        }`}
                                    >
                                        {message.sender}
                                    </div>
                                    <div
                                        className={`rounded-xl p-2 ${
                                            message.sender === "user"
                                                ? "bg-white text-black ml-2"
                                                : "bg-gray-800 text-white mr-2"
                                        }`}
                                    >
                                        {message.message}
                                        {message.sender !== "user" && (
                                            <div
                                                className="w-7 h-7 rounded-full absolute -bottom-3 -right-2"
                                                style={{
                                                    background: gradient(
                                                        message.sender
                                                    ),
                                                }}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-[10%] w-full bg-gray-900 flex items-center p-1.5 gap-1.5">
                        <AddCircleIcon
                            fontSize={"large"}
                            className="text-white"
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
