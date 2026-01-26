import Footer from "@/components/ui/footer/Footer";
import Navbar from "@/components/ui/navbar/parent/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex flex-col scrollbar-custom">
            <header className="container">
                <Navbar />
            </header>

            <main className="container flex-1 py-5 px-1 overflow-hidden">{children}</main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}
