"use client";
import React from "react";
import { Button } from "@mui/joy";
import { useRouter } from "next/navigation";
import { POST } from "app/api/user/route";
import InterestSelector from "components/InterestSelector";

export default function OnboardingPage() {
    const [interests, setInterests] = React.useState<string[]>([]);

    const router = useRouter();

    return (
        <>
            <div className="bg-zinc-950 h-[100vh] flex justify-center items-center">
                <div className="bg-gray-900 rounded-lg w-full h-full max-w-[450px] max-h-[550px] p-2.5 flex flex-col items-center justify-between gap-2">
                    <div className="bg-gray-800 text-white w-full rounded-lg p-3.5 justify-center flex text-center tracking-tight text-xl">
                        Select your interests from the list
                    </div>
                    <div className="bg-gray-800 h-full w-full rounded-lg p-2.5 flex flex-col gap-4 justify-center">
                        <InterestSelector
                            onChange={(value) => setInterests(value)}
                        />

                        <Button
                            variant="solid"
                            onClick={async () => {
                                const response = (await (
                                    await fetch("/api/user", {
                                        method: "POST",
                                        body: JSON.stringify({ interests }),
                                    })
                                ).json()) as POST;

                                router.push(`/user/${response}/chats`);
                            }}
                        >
                            Create user
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
