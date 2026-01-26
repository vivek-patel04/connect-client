import UserSuggestions from "@/components/ui/common/UserSuggestions";
import PostBox from "@/components/ui/feed/parent/PostBox";
import Posts from "@/components/ui/feed/parent/Posts";
import ViewerPhotoAndName from "@/components/ui/common/ViewerPhotoAndName";

export default function page() {
    return (
        <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="w-[316px] hidden md:block">
                <section>
                    <ViewerPhotoAndName />
                </section>

                <section className="mt-10 hidden md:flex md:flex-col md:gap-1.5">
                    <div className="backdrop-heading">
                        <h2>Suggestions</h2>
                    </div>

                    <UserSuggestions limit={4} />
                </section>
            </div>

            <div className="w-full md:flex-1">
                <section className="w-full">
                    <PostBox />
                </section>

                <section className="md:hidden mt-2 max-w-[316px] w-full flex flex-col gap-2">
                    <div className="backdrop-heading">
                        <h2>Suggestions</h2>
                    </div>
                    <UserSuggestions limit={3} />
                </section>

                <section className="mt-8">
                    <Posts />
                </section>
            </div>
        </div>
    );
}
