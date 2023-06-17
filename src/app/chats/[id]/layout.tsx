import styles from "styles/Home.module.css";
import React from "react";
import ChatNav from "components/ChatNav";

const chatIds = ["1000", "1001", "1002", "1003", "1004"];

export default function Home({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    return (
        <div className={styles.container}>
            <ChatNav
                chatIds={["1000", "1001", "1002", "1003", "1004"]}
                selected={chatIds.indexOf(params.id)}
            />

            {children}
        </div>
    );
}
