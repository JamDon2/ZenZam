import React from "react";

function ChatNav() {
    return (
        <div>
            <div className="h-[8vh] px-5 flex items-center gap-4 bg-gray-900">
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
                <div className="border-r border-gray-500 h-[70%]"></div>
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
            </div>
        </div>
    );
}

export default ChatNav;
