import { UserMiniType } from "@/types/user/types";
import ThumbnailWithName from "../../common/ThumbnailWithName";
import { useState } from "react";
import { useCancelRequestMutation } from "@/hooks/api/user/useCancelRequestMutation";

export default function SentRequestCard({ user }: { user: UserMiniType }) {
    const [isCancelRequestSent, setIsCancelRequestSent] = useState(false);

    const { mutateAsync: cancelRequest } = useCancelRequestMutation();

    const handleCancelRequest = () => {
        setIsCancelRequestSent(true);

        setTimeout(async () => {
            try {
                await cancelRequest(user.id);
            } catch (error) {
                setIsCancelRequestSent(false);
            }
        }, 2000);
    };

    return (
        <div className="flex items-center justify-between backdrop-user-mini">
            <div className="w-[230px]">
                <ThumbnailWithName userID={user.id} name={user.name} url={user.thumbnailURL} />
            </div>

            {isCancelRequestSent ? (
                <span className="btn-disable">Cancelled</span>
            ) : (
                <button className="btn" onClick={handleCancelRequest}>
                    Cancel
                </button>
            )}
        </div>
    );
}
