import { TfiThought } from "react-icons/tfi";
import { GoBell, GoCommentDiscussion, GoHeart } from "react-icons/go";
import RedirectToAuthButtons from "@/components/ui/home/RedirectToAuthButtons";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HighlightCard from "@/components/ui/home/HighlightCard";

export default async function page() {
    const rawCookiefromBrowser = (await headers()).get("cookie");

    if (rawCookiefromBrowser?.includes("refreshToken=")) {
        redirect("/feed");
    }

    return (
        <div className="p-1.5 md:pt-[10vh]">
            <div className="flex flex-col md:flex-row gap-5 items-start">
                <section className="max-w-[400px] w-full">
                    <div>
                        <p>
                            <strong className="text-5xl font-extrabold">Connect With People.</strong>
                        </p>

                        <p className="mt-3">
                            <strong className="font-extrabold text-white-50 text-5xl">Share Your World.</strong>
                        </p>
                    </div>

                    <div className="mt-3">
                        <RedirectToAuthButtons />
                    </div>

                    <div className="mt-3 text-white-50">
                        <p>Connect is a clean, modern social platform designed for real conversations and meaningful connections.</p>
                    </div>
                </section>

                <section className="flex-1">
                    <div className="w-full h-full rounded-3xl overflow-hidden">
                        <img src="./home3.jpg" alt="friendship" className="w-full object-cover" />
                    </div>
                </section>
            </div>

            <section className="flex flex-col items-center md:items-stretch md:flex-row justify-between gap-5 mt-20">
                <HighlightCard icon={<TfiThought />} title="Post Your Thoughts" description="Share text-based thoughts and ideas with your connections" />
                <HighlightCard icon={<GoHeart />} title="Like & Comment" description="Engage with posts through likes and meaningful comments" />
                <HighlightCard icon={<GoCommentDiscussion />} title="Live Chat" description="Real-time one-to-one chat to keep conversations flowing" />
                <HighlightCard icon={<GoBell />} title="Live Notifications" description="Instant notifications so you never miss important activity" />
            </section>
        </div>
    );
}
