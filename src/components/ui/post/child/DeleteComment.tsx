import { useDeleteCommentMutation } from "@/hooks/api/post/useDeleteCommentMutation";
import { CommentType } from "@/types/post/types";
import { useQueryClient } from "@tanstack/react-query";
import { LuTrash2 } from "react-icons/lu";

export default function DeleteComment({ comment }: { comment: CommentType }) {
    const { mutateAsync, isPending } = useDeleteCommentMutation();
    const queryClient = useQueryClient();
    return (
        <button
            className="btn-icon"
            onClick={async () => {
                if (isPending) return;

                try {
                    await mutateAsync({ postID: comment.postID, commentID: comment.id });
                    await queryClient.refetchQueries({
                        queryKey: [`post:${comment.postID}`],
                    });
                } catch (error) {}
            }}
        >
            <LuTrash2 size={16} />
        </button>
    );
}
