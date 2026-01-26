"use client";

import { useAddLikeMutation } from "@/hooks/api/post/useAddLIkeMutation";
import { useDeleteLikeMutation } from "@/hooks/api/post/useDeleteLikeMutation";
import { clientBaseUrl } from "@/utils/baseURL";
import { useRouter } from "next/navigation";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface PropsType {
    viewerLiked: boolean;
    count: number;
    postID: string;
}

const baseURL = clientBaseUrl;

export default function FeedPostLike({ viewerLiked, count, postID }: PropsType) {
    const { mutateAsync: addLike, isPending: addLikeProcessing } = useAddLikeMutation();
    const { mutateAsync: deleteLike, isPending: deleteLikeProcessing } = useDeleteLikeMutation();
    const router = useRouter();

    const handleOnLike = async () => {
        if (addLikeProcessing) return;

        try {
            await addLike({ postID });
        } catch (error) {}
    };

    const handleOnDeleteLike = async () => {
        if (deleteLikeProcessing) return;

        try {
            await deleteLike({ postID });
        } catch (error) {}
    };
    return (
        <div className="flex items-center gap-1">
            {viewerLiked ? (
                <span onClick={handleOnDeleteLike} className="hover:cursor-pointer text-red-600">
                    <GoHeartFill size={19} />
                </span>
            ) : (
                <span onClick={handleOnLike} className="hover:cursor-pointer">
                    <GoHeart size={19} />
                </span>
            )}

            <span
                className=" text-white-50 hover:cursor-pointer"
                onClick={() => {
                    router.push(`/post/${postID}`);
                }}
            >
                {count}
            </span>
        </div>
    );
}
