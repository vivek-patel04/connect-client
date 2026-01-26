"use client";

import { useAddCommentMutation } from "@/hooks/api/post/useAddCommentMutation";
import { useState } from "react";

export default function CommentBox({ postID }: { postID: string }) {
    const { mutateAsync, isPending } = useAddCommentMutation({ postID });
    const [input, setInput] = useState("");

    const handleOnClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending || input.trim().length === 0) return;

        try {
            await mutateAsync({ comment: input });
            setInput("");
        } catch (error) {}
    };

    return (
        <div>
            <form onSubmit={handleOnClick}>
                <textarea
                    className="border w-full h-[60px] rounded-xl resize-none outline-none border-white-60 p-2 block placeholder:text-white-50"
                    placeholder="Write your comment..."
                    value={input}
                    maxLength={700}
                    onChange={e => setInput(e.target.value)}
                ></textarea>

                <button className="btn mt-3" type="submit">
                    Post
                </button>
            </form>
        </div>
    );
}
