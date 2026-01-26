import Post from "@/components/ui/post/parent/Post";

export default async function Page({ params }: { params: Promise<{ postID: string }> }) {
    const { postID } = await params;

    return (
        <article>
            <Post postID={postID} />
        </article>
    );
}
