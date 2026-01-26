import { PostType } from "@/types/post/types";
import ThumbnailWithName from "../../common/ThumbnailWithName";
import DeletePost from "./DeletePost";
import FeedPostLike from "./FeedPostLike";
import FeedPostComment from "./FeedPostComment";

export default function Post({ post }: { post: PostType }) {
    const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(post.createdAt));

    return (
        <article className="backdrop-white-1">
            <div className="flex justify-between items-start">
                <ThumbnailWithName userID={post.user.id} name={post.user.name} url={post.user.thumbnailURL} />

                {post.viewerPost && <DeletePost postID={post.id} />}
            </div>

            <div className="backdrop-blue-1 mt-3">
                <p className="whitespace-pre-wrap">{post.post}</p>

                <div className="flex justify-end">
                    <p className="text-[0.7rem] text-white-50 mt-3">{formattedDateTime}</p>
                </div>
            </div>

            <div className="flex items-center gap-5 mt-3">
                <FeedPostLike viewerLiked={post.viewerLiked} count={post.likeCount} postID={post.id} />
                <FeedPostComment count={post.commentCount} postID={post.id} />
            </div>
        </article>
    );
}
