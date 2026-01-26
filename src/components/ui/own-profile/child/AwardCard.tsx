import { useDeleteAwardMutation } from "@/hooks/api/user/useDeleteAwardMutation";
import { AwardType } from "@/types/user/types";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";

interface PropsType {
    award: AwardType;
    onClickEdit: (id: string) => void;
}
export default function AwardCard({ award, onClickEdit }: PropsType) {
    const { mutateAsync, isPending } = useDeleteAwardMutation();

    const handleOnDelete = async () => {
        if (isPending) return;
        try {
            await mutateAsync({ awardID: award.id });
        } catch (error) {}
    };
    return (
        <div className="backdrop-blue-1">
            <div className="flex justify-between items-start">
                <p className="text-heading">{award.title}</p>

                <div className="flex gap-1">
                    <button
                        className="btn-icon"
                        onClick={() => {
                            onClickEdit(award.id);
                        }}
                    >
                        <LuPencilLine size={17} />
                    </button>

                    <button className="btn-icon" onClick={handleOnDelete}>
                        <LuTrash2 size={17} />
                    </button>
                </div>
            </div>

            <div>
                {award.description && (
                    <div className="mt-3 ">
                        <p className="text-justify text-white-20 text-small">{award.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
