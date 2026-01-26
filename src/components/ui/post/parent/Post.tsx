"use client";

import ThumbnailWithName from "../../common/ThumbnailWithName";
import { useGetPostQuery } from "@/hooks/api/post/useGetPostQuery";
import { useState } from "react";
import CommentsSection from "../child/CommentsSection";
import LikeSection from "../child/LikeSection";
import LikeIconAndCount from "../child/LikeIconAndCount";
import CommentIconAndCount from "../child/CommentIconAndCount";
import ErrorMessage from "../../error/ErrorMessage";

export default function Post({ postID }: { postID: string }) {
    const { data: post, isLoading, error } = useGetPostQuery({ postID });
    const [activeSection, setActiveSection] = useState<"commentSection" | "likeSection">("commentSection");

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5">
                <div className="loading-card-white">
                    <div className="loading-line-small"></div>
                    <div className="loading-line-mid mt-3"></div>
                </div>
            </div>
        );
    }

    if (error) {
        console.log(error);
        return <ErrorMessage />;
    }

    if (!post) {
        return;
    }

    const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(post.createdAt));

    return (
        <>
            <section>
                <div className="backdrop-white-1">
                    <div className="flex justify-between items-start">
                        <ThumbnailWithName userID={post.userID} name={post.user.name} url={post.user.thumbnailURL} />
                    </div>

                    <div className="backdrop-blue-1 mt-3">
                        <p className="whitespace-pre-wrap">{post.post}</p>

                        <div className="flex justify-end">
                            <p className="text-[0.7rem] text-white-50 mt-3">{formattedDateTime}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 mt-3">
                        <LikeIconAndCount
                            viewerLiked={post.viewerLiked}
                            count={post.likeCount}
                            postID={post.id}
                            onClickCount={() => setActiveSection("likeSection")}
                        />
                        <CommentIconAndCount count={post.commentCount} onClick={() => setActiveSection("commentSection")} />
                    </div>
                </div>
            </section>

            <section className="mt-5 min-w-[320px] w-full">
                {activeSection === "commentSection" ? <CommentsSection postID={postID} /> : <LikeSection postID={postID} />}
            </section>
        </>
    );
}
