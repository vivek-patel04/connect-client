"use client";

import { useGetUserPostsQuery } from "@/hooks/api/post/useGetUserPostsQuery";
import { useEffect, useMemo, useRef } from "react";
import Post from "./Post";
import ErrorMessage from "../../error/ErrorMessage";

export default function MyPosts() {
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, error } = useGetUserPostsQuery();

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

    const allPosts = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(p => p.posts);
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="loading-card-white">
                        <div className="loading-line-small"></div>
                        <div className="loading-line-mid mt-3"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        console.log(error);
        return <ErrorMessage message={"Error on fetching posts. Please try again later."} />;
    }

    if (allPosts.length === 0)
        return (
            <div className="flex justify-center">
                <p className="text-small text-white-50">No posts</p>
            </div>
        );
    return (
        <>
            <ul className="flex flex-col gap-5">
                {allPosts.map(post => (
                    <li key={post.id}>
                        <Post post={post} />
                    </li>
                ))}
            </ul>

            <div ref={loadMoreRef} className="h-10 flex justify-center items-center py-5 text-small text-white-50">
                {isFetchingNextPage && <p>Loading</p>}
                {!hasNextPage && <p>No more posts</p>}
            </div>
        </>
    );
}
