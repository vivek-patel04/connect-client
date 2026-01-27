import { Inter, Pacifico } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

export const metadata = {
    title: {
        default: "Connect",
        template: "%s | Connect",
    },
    description: "Connect with people and build better relationships",
    keywords: ["Connect", "Social Media", "Chat", "Connect with people", "Chat with people"],
};

const inter = Inter({ subsets: ["latin"] });

export const logo = Pacifico({ weight: "400" });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                    <div id="modal" />
                </Providers>
            </body>
        </html>
    );
}
