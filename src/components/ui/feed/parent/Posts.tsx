"use client";

import { useState } from "react";
import NetworkFeed from "../child/NetworkFeed";
import MyPosts from "../child/MyPosts";
import { useQueryClient } from "@tanstack/react-query";

export default function Posts() {
    const [activeFeed, setActiveFeed] = useState("networkFeed");
    const queryClient = useQueryClient();

    const handleOnClickNetworkFeed = async () => {
        setActiveFeed("networkFeed");
        await queryClient.refetchQueries({ queryKey: ["feedPosts"] });
    };

    const handleOnClickMyPosts = async () => {
        setActiveFeed("myPosts");
        await queryClient.refetchQueries({ queryKey: ["userPosts"] });
    };
    return (
        <>
            <div className="h-[52px] bg-white-60 border border-white-60 rounded-2xl flex gap-px">
                <button
                    className={`flex-1 rounded-l-2xl hover:cursor-pointer ${activeFeed === "networkFeed" ? "bg-white font-medium" : "bg-body"}`}
                    onClick={handleOnClickNetworkFeed}
                >
                    Network Feed
                </button>
                <button
                    className={`flex-1 rounded-r-2xl hover:cursor-pointer ${activeFeed === "myPosts" ? "bg-white font-medium" : "bg-body"}`}
                    onClick={handleOnClickMyPosts}
                >
                    My posts
                </button>
            </div>

            <div className="mt-5">{activeFeed === "networkFeed" ? <NetworkFeed /> : <MyPosts />}</div>
        </>
    );
}
