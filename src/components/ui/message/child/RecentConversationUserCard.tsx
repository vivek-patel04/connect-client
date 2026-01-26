"use client";

import { useAppDispatch } from "@/hooks/redux/hooks";
import { setActiveChat } from "@/store/features/activeChatSlice";
import { RecentConversationUserType } from "@/types/message/types";
import ThumbnailWithName from "./ThumbnailWithName";
import { useResetUnreadCountMutation } from "@/hooks/api/message/useResetUnreadCountMutation";
import { closeUserSidebar } from "@/store/features/uiSlice";

export default function RecentConversationUserCard({ conversationUser }: { conversationUser: RecentConversationUserType }) {
    const dispatch = useAppDispatch();
    const { mutateAsync } = useResetUnreadCountMutation();

    const { id, name, thumbnailURL } = conversationUser.user;

    return (
        <div
            className="flex items-center justify-between backdrop-user-mini hover:cursor-pointer"
            onClick={async () => {
                dispatch(setActiveChat({ userID: id, name, thumbnailURL }));
                dispatch(closeUserSidebar());

                if (conversationUser.unreadMessageCount > 0) {
                    await mutateAsync(conversationUser.user.id).catch(error => console.log(error));
                }
            }}
        >
            <ThumbnailWithName name={name} url={thumbnailURL} />

            <span className={`number-cicle ${conversationUser.unreadMessageCount > 0 ? "" : "hidden"}`}>{conversationUser.unreadMessageCount}</span>
        </div>
    );
}
