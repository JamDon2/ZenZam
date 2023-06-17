"use client";
import React from "react";
import AutoTag from "components/AutoTag";

export default function Page() {
    return (
        <>
            <div className="bg-gray-800 h-[100vh] flex justify-center items-center">
                <div className="bg-gray-600 rounded-lg w-full h-full max-w-[450px] max-h-[550px] p-2.5 flex flex-col items-center justify-between gap-2">
                    <div className="bg-gray-400 w-full rounded-lg p-3.5 justify-center flex text-center tracking-tight text-xl">
                        Enter and select the topics you are interested in
                    </div>
                    <div className="bg-gray-400 h-full w-full rounded-lg p-2.5">
                        <AutoTag />
                    </div>
                </div>
            </div>
        </>
    );
}
