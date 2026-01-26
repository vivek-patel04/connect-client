import { useGetLikesQuery } from "@/hooks/api/post/useGetLikesQuery";
import ThumbnailWithName from "../../common/ThumbnailWithName";
import { useEffect, useMemo, useRef } from "react";
import ErrorMessage from "../../error/ErrorMessage";

export default function LikeSection({ postID }: { postID: string }) {
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, error } = useGetLikesQuery({ postID });

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

    const likes = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.likes);
    }, [data]);

    if (isLoading) {
        return;
    }

    if (error) {
        return <ErrorMessage />;
    }
    return (
        <div>
            <h2 className="font-semibold mt-5">Likes</h2>

            {likes.length === 0 ? (
                <div className="flex justify-center mt-3">
                    <p className="text-small text-white-50">No likes</p>
                </div>
            ) : (
                <div>
                    <ul className="mt-3 flex flex-col gap-1.5 w-[316px]">
                        {likes.map(like => (
                            <li key={like.id} className="backdrop-user-mini">
                                <ThumbnailWithName userID={like.user.id} name={like.user.name} url={like.user.thumbnailURL} />
                            </li>
                        ))}
                    </ul>

                    <div ref={loadMoreRef} className="h-10 flex justify-center items-center py-5 text-small text-white-50">
                        {isFetchingNextPage && <p>Loading</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
