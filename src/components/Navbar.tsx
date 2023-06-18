import Link from "next/link";
import React from "react";

function Navbar({
    basePath,
    chatIds,
    selected,
}: {
    basePath: string;
    chatIds: string[];
    selected: number;
}) {
    return (
        <div>
            <div className="h-[8vh] px-5 flex items-center gap-4 bg-gray-800 drop-shadow-md">
                <Link href={`${basePath}/chats`}>
                    <div className="rounded-full bg-[#FAFF13] w-10 aspect-square flex justify-center items-center  transition-all hover:scale-110"></div>
                </Link>

                <div className="rounded-full bg-gray-500 w-[0.15rem] h-[40%]"></div>

                <div className="flex px-2 gap-4 overflow-auto h-full items-center grow">
                    {chatIds.map((id, i) => {
                        return (
                            <Link href={`${basePath}/chats/${id}`} key={i}>
                                <div
                                    className={`rounded-full transition-all bg-yellow-500 w-10 hover:scale-110 aspect-square ${
                                        selected === i &&
                                        "outline outline-offset-2 outline-blue-500"
                                    }`}
                                ></div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
