"use client";

import { useGetCommentsQuery } from "@/hooks/api/post/useGetCommentsQuery";
import ThumbnailWithName from "../../common/ThumbnailWithName";
import CommentBox from "./CommentBox";
import DeleteComment from "./DeleteComment";
import { useEffect, useMemo, useRef } from "react";
import ErrorMessage from "../../error/ErrorMessage";

export default function CommentsSection({ postID }: { postID: string }) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useGetCommentsQuery({ postID });

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage) return;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetchingNextPage) {
                fetchNextPage();
            }
        });

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const comments = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(c => c.comments);
    }, [data]);

    if (isLoading) {
        return;
    }

    if (error) {
        return <ErrorMessage />;
    }

    return (
        <div>
            <CommentBox postID={postID} />

            <h2 className="font-semibold mt-5">Comments</h2>

            {comments.length === 0 ? (
                <div className="flex justify-center mt-3">
                    <p className="text-small text-white-50">No comments</p>
                </div>
            ) : (
                <div className="mt-3">
                    <ul className="flex flex-col bg-white-90 gap-px">
                        {comments.map(comment => (
                            <li key={comment.id} className="py-2 bg-body">
                                <div className=" flex justify-between items-end">
                                    <ThumbnailWithName userID={comment.userID} name={comment.user.name} url={comment.user.thumbnailURL} />

                                    {comment.viewerComment && <DeleteComment comment={comment} />}
                                </div>

                                <p className="mt-2 ml-2 text-white-30 whitespace-pre-wrap">{comment.comment}</p>
                            </li>
                        ))}
                    </ul>

                    <div ref={loadMoreRef} className="h-10 flex justify-center items-center py-5 text-small">
                        {isFetchingNextPage && <p>Loading</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
