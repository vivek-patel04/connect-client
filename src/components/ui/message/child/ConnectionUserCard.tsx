import { UserMiniType } from "@/types/user/types";
import ThumbnailWithName from "./ThumbnailWithName";
import { setActiveChat } from "@/store/features/activeChatSlice";
import { useAppDispatch } from "@/hooks/redux/hooks";
import { closeUserSidebar } from "@/store/features/uiSlice";

interface PropsType {
    connection: UserMiniType;
}

export default function ConnectionUserCard({ connection: c }: PropsType) {
    const dispatch = useAppDispatch();

    return (
        <div
            className="backdrop-user-mini hover:cursor-pointer"
            onClick={() => {
                dispatch(setActiveChat({ userID: c.id, name: c.name, thumbnailURL: c.thumbnailURL }));
                dispatch(closeUserSidebar());
            }}
        >
            <ThumbnailWithName name={c.name} url={c.thumbnailURL} />
        </div>
    );
}
