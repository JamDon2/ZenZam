import styles from "styles/Home.module.css";
import React from "react";
import ChatNav from "components/ChatNav";

export default function Home({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <ChatNav />

            {children}
        </div>
    );
}
