import React from "react";

function ChatNav() {
    return (
        <div>
            <div className="h-[8vh] px-5 flex items-center gap-4 bg-gray-800 drop-shadow-md">
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
                <div className="rounded-full bg-gray-500 w-[0.15rem] h-[40%]"></div>
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
                <div className="rounded-full bg-yellow-500 w-10 aspect-square"></div>
            </div>
        </div>
    );
}

export default ChatNav;
