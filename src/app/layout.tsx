"use client";
import "styles/globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/joy";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CssBaseline>
            <title>ZenZam</title>
            <html lang="en">
                <body>{children}</body>
            </html>
        </CssBaseline>
    );
}
