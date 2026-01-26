import { useRouter } from "next/navigation";
import { GoComment } from "react-icons/go";

export default function FeedPostComment({ count, postID }: { count: number; postID: string }) {
    const router = useRouter();
    const handleOnClickComment = () => {
        router.push(`/post/${postID}`);
    };

    return (
        <div className="flex items-center gap-1">
            <span onClick={handleOnClickComment} className="hover:cursor-pointer">
                <GoComment size={18} />
            </span>

            <span className=" text-white-50 hover:cursor-pointer" onClick={handleOnClickComment}>
                {count}
            </span>
        </div>
    );
}
