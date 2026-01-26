import { UserMiniType } from "@/types/user/types";
import ThumbnailWithName from "../../common/ThumbnailWithName";
import { useState } from "react";
import { useDeleteConnectionMutation } from "@/hooks/api/user/useDeleteConnectionMutation";

export default function ConnectionCard({ user }: { user: UserMiniType }) {
    const [isDeleteRequestSent, setIsDeleteRequestSent] = useState(false);

    const { mutateAsync: removeConnection } = useDeleteConnectionMutation();

    const handleRemoveConnection = () => {
        setIsDeleteRequestSent(true);

        setTimeout(async () => {
            try {
                await removeConnection(user.id);
            } catch (error) {
                setIsDeleteRequestSent(false);
            }
        }, 2000);
    };

    return (
        <div className="backdrop-user-mini flex items-center justify-between">
            <div className="w-[230px]">
                <ThumbnailWithName userID={user.id} name={user.name} url={user.thumbnailURL} />
            </div>

            {isDeleteRequestSent ? (
                <span className="btn-disable">Disconnected</span>
            ) : (
                <button className="btn" onClick={handleRemoveConnection}>
                    Disconnected
                </button>
            )}
        </div>
    );
}
