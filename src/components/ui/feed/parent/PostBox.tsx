"use client";

import { useCreatePostMutation } from "@/hooks/api/post/useCreatePostMutation";
import { useState } from "react";

export default function PostBox() {
    const [input, setInput] = useState("");

    const { mutateAsync, isPending } = useCreatePostMutation();

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        if (isPending) return;

        try {
            await mutateAsync({ post: input });
            setInput("");
        } catch (error: any) {
            setInput("");
        }
    };
    return (
        <form onSubmit={handleOnSubmit}>
            <textarea
                className="border w-full h-[120px] rounded-xl resize-none outline-none border-white-60 p-2 block placeholder:text-white-50"
                placeholder="Write your thoughts..."
                value={input}
                maxLength={700}
                onChange={e => setInput(e.target.value)}
            ></textarea>

            <div className="mt-3 flex justify-end">
                <input type="submit" value="Post" className="btn" />
            </div>
        </form>
    );
}
