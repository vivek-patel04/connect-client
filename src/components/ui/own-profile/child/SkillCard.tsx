import { useDeleteSkillMutation } from "@/hooks/api/user/useDeleteSkillMutation";
import { SkillType } from "@/types/user/types";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";

interface PropsType {
    skill: SkillType;
    onClickEdit: (id: string) => void;
}
export default function SkillCard({ skill, onClickEdit }: PropsType) {
    const { mutateAsync, isPending } = useDeleteSkillMutation();

    const handleOnDelete = async () => {
        if (isPending) return;
        try {
            await mutateAsync({ skillID: skill.id });
        } catch (error) {}
    };
    return (
        <div className="backdrop-blue-1">
            <div className="flex justify-between items-start">
                <p className="text-heading">{skill.skillName}</p>

                <div className="flex gap-1">
                    <button
                        className="btn-icon"
                        onClick={() => {
                            onClickEdit(skill.id);
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
                {skill.description && (
                    <div className="mt-3 ">
                        <p className="text-justify text-white-20 text-small">{skill.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
