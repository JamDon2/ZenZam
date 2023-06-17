import styles from "styles/Home.module.css";
import React from "react";
import Navbar from "components/Navbar";

const chatIds = Array(10)
    .fill(null)
    .map((_, i) => String(1000 + i));

export default function Home({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    return (
        <div className={styles.container}>
            <Navbar chatIds={chatIds} selected={chatIds.indexOf(params.id)} />

            {children}
        </div>
    );
}
