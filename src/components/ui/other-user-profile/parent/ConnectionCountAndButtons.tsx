"use client";

import { useUserProfileContext } from "@/context/UserProfileProvider";
import { useGetConnectionCountQuery } from "@/hooks/api/user/useGetConnectionCountQuery";
import { useGetRelationQuery } from "@/hooks/api/user/useGetRelationQuery";
import { useAcceptRequestMutation } from "@/hooks/api/user/useAcceptRequestMutation";
import { useRejectRequestMutation } from "@/hooks/api/user/useRejectRequestMutation";
import { useDeleteConnectionMutation } from "@/hooks/api/user/useDeleteConnectionMutation";
import { useCancelRequestMutation } from "@/hooks/api/user/useCancelRequestMutation";
import { useSendRequestMutation } from "@/hooks/api/user/useSendRequestMutation";
import ErrorMessage from "../../error/ErrorMessage";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux/hooks";
import { setActiveChat } from "@/store/features/activeChatSlice";

function ConnectionCountAndButtons() {
    const { userProfile } = useUserProfileContext();
    const { data: userRelation, isLoading: relationLoading, error: relationError } = useGetRelationQuery(userProfile.id);
    const { data: count, isLoading: countLoading, error: countError } = useGetConnectionCountQuery(userProfile.id);
    const { mutateAsync: sendRequest } = useSendRequestMutation();
    const { mutateAsync: acceptRequest } = useAcceptRequestMutation();
    const { mutateAsync: rejectRequest } = useRejectRequestMutation();
    const { mutateAsync: deleteConnection } = useDeleteConnectionMutation();
    const { mutateAsync: cancelRequest } = useCancelRequestMutation();

    const router = useRouter();
    const dispatch = useAppDispatch();

    if (relationLoading || countLoading)
        return (
            <div>
                <div className="loading-line-small" />
                <div className="loading-line-mid mt-3" />
            </div>
        );

    if (relationError || countError) return <ErrorMessage />;

    if (!userRelation || count === undefined) return null;

    let relation = userRelation.relation;

    const handleSendRequest = async () => {
        try {
            await sendRequest(userProfile.id);
        } catch (error) {}
    };
    const handleAcceptRequest = async () => {
        try {
            await acceptRequest(userProfile.id);
        } catch (error) {}
    };
    const handleRejectRequest = async () => {
        try {
            await rejectRequest(userProfile.id);
        } catch (error) {}
    };
    const handleDeleteConnection = async () => {
        try {
            await deleteConnection(userProfile.id);
        } catch (error) {}
    };
    const handleCancelRequest = async () => {
        try {
            await cancelRequest(userProfile.id);
        } catch (error) {}
    };
    const handleClickMessage = () => {
        dispatch(setActiveChat({ name: userProfile.name, userID: userProfile.id, thumbnailURL: userProfile.personalData.thumbnailURL }));
        router.push("/message");
    };

    return (
        <div>
            <div className="flex gap-1 text-small font-medium">
                <p>Connections: {count}</p>
            </div>

            <div className="mt-3">
                {relation === "no relation" && (
                    <button className="btn" onClick={handleSendRequest}>
                        Connect
                    </button>
                )}

                {relation === "connection" && (
                    <div className="flex flex-col md:flex-row gap-3">
                        <button className="btn" onClick={handleDeleteConnection}>
                            Disconnect
                        </button>

                        <button className="btn" onClick={handleClickMessage}>
                            Message
                        </button>
                    </div>
                )}

                {relation === "request sent" && (
                    <button className="btn" onClick={handleCancelRequest}>
                        Cancel request
                    </button>
                )}

                {relation === "request received" && (
                    <div className="flex flex-col md:flex-row gap-3">
                        <button className="btn" onClick={handleAcceptRequest}>
                            Accept request
                        </button>

                        <button className="btn" onClick={handleRejectRequest}>
                            Reject request
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ConnectionCountAndButtons;
