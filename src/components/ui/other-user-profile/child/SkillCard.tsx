import { SkillType } from "@/types/user/types";

interface PropsType {
    skill: SkillType;
}
export default function SkillCard({ skill }: PropsType) {
    return (
        <div className="backdrop-blue-1">
            <div className="text-heading">
                <p>{skill.skillName}</p>
            </div>

            <div className="text-white-50 text-small">{skill.description && <p className="mt-2">{skill.description}</p>}</div>
        </div>
    );
}
