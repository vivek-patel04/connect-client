"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo } from "react";

interface PropsType {
    userID: string;
    name: string;
    url: string;
}

function ThumbnailWithName({ userID, name, url }: PropsType) {
    const router = useRouter();
    return (
        <div className="flex gap-2 items-center">
            <div className="relative w-[38px] h-[38px] rounded-full overflow-hidden">
                <Image src={url} alt="photo" fill={true} className="object-cover" />
            </div>
            <span
                className="hover:cursor-pointer font-medium"
                onClick={() => {
                    router.push(`/profile/${userID}`);
                }}
            >
                {name}
            </span>
        </div>
    );
}

export default memo(ThumbnailWithName);
