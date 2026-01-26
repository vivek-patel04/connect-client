import Footer from "@/components/ui/footer/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex items-center justify-center py-5">{children}</main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}
