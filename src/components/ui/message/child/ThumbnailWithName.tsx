import Image from "next/image";
import { memo } from "react";

interface PropsType {
    name: string;
    url: string;
}

function ThumbnailWithName({ name, url }: PropsType) {
    return (
        <div className="flex gap-2 items-center">
            <div className="relative w-[38px] h-[38px] rounded-full overflow-hidden">
                <Image src={url} alt="photo" fill={true} className="object-cover" />
            </div>
            <span className="font-medium">{name}</span>
        </div>
    );
}

export default memo(ThumbnailWithName);
