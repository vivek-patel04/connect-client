import Footer from "@/components/ui/footer/Footer";
import Navbar from "@/components/ui/navbar/parent/Navbar";

export const metadata = {
    title: "Post",
    description: "post.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="container grow">
                <header>
                    <Navbar />
                </header>

                <main className="py-5 px-1">{children}</main>
            </div>

            <div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}
