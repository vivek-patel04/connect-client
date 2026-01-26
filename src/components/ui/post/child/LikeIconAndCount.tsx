"use client";

import { useAddLikeMutation } from "@/hooks/api/post/useAddLIkeMutation";
import { useDeleteLikeMutation } from "@/hooks/api/post/useDeleteLikeMutation";
import { clientBaseUrl } from "@/utils/baseURL";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface PropsType {
    viewerLiked: boolean;
    count: number;
    postID: string;
    onClickCount: () => void;
}

const baseURL = clientBaseUrl;

export default function LikeIconAndCount({ viewerLiked, count, postID, onClickCount }: PropsType) {
    const { mutateAsync: addLike, isPending: addLikeProcessing } = useAddLikeMutation();
    const { mutateAsync: deleteLike, isPending: deleteLikeProcessing } = useDeleteLikeMutation();

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
                <button onClick={handleOnDeleteLike} className="hover:cursor-pointer text-red-600">
                    <GoHeartFill size={19} />
                </button>
            ) : (
                <button onClick={handleOnLike} className="hover:cursor-pointer">
                    <GoHeart size={19} />
                </button>
            )}

            <button className=" text-white-50 hover:cursor-pointer" onClick={onClickCount}>
                {count}
            </button>
        </div>
    );
}
