import { useDeletePostMutation } from "@/hooks/api/post/useDeletePostMutation";
import { LuTrash2 } from "react-icons/lu";

export default function ({ postID }: { postID: string }) {
    const { mutateAsync, isPending } = useDeletePostMutation();

    const handleDeletePost = async () => {
        if (isPending) return;

        try {
            await mutateAsync({ postID });
        } catch (error) {}
    };

    return (
        <span className="btn-icon" onClick={handleDeletePost}>
            <LuTrash2 size={16} />
        </span>
    );
}
