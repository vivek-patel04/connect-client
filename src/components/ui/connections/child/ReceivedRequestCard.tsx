import { UserMiniType } from "@/types/user/types";
import ThumbnailWithName from "../../common/ThumbnailWithName";
import { useState } from "react";
import { useAcceptRequestMutation } from "@/hooks/api/user/useAcceptRequestMutation";
import { useRejectRequestMutation } from "@/hooks/api/user/useRejectRequestMutation";

export default function ReceivedRequestCard({ user }: { user: UserMiniType }) {
    const [isAcceptRequestSent, setIsAcceptRequestSent] = useState(false);
    const [isRejectRequestSent, setIsRejectRequestSent] = useState(false);

    const { mutateAsync: acceptRequest } = useAcceptRequestMutation();
    const { mutateAsync: rejectRequest } = useRejectRequestMutation();

    const handleAccept = () => {
        setIsAcceptRequestSent(true);

        setTimeout(async () => {
            try {
                await acceptRequest(user.id);
            } catch (error) {
                setIsAcceptRequestSent(false);
            }
        }, 2000);
    };

    const handleReject = () => {
        setIsRejectRequestSent(true);

        setTimeout(async () => {
            try {
                await rejectRequest(user.id);
            } catch (error) {
                setIsRejectRequestSent(false);
            }
        }, 2000);
    };

    return (
        <div className="flex items-center justify-between backdrop-user-mini">
            <div className="w-[230px]">
                <ThumbnailWithName userID={user.id} name={user.name} url={user.thumbnailURL} />
            </div>

            {!isAcceptRequestSent && !isRejectRequestSent && (
                <div className="flex flex-col lg:flex-row items-center gap-2">
                    <button className="btn" onClick={handleAccept}>
                        Accept
                    </button>

                    <button className="btn" onClick={handleReject}>
                        Reject
                    </button>
                </div>
            )}

            {isAcceptRequestSent && !isRejectRequestSent && <span className="btn-disable">Accepted</span>}

            {!isAcceptRequestSent && isRejectRequestSent && <span className="btn-disable">Rejected</span>}
        </div>
    );
}
