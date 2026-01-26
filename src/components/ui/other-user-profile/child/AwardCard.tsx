import { AwardType } from "@/types/user/types";

interface PropsType {
    award: AwardType;
}
export default function AwardCard({ award }: PropsType) {
    return (
        <div className="backdrop-blue-1">
            <div className="text-heading">
                <p>{award.title}</p>
            </div>

            <div className="text-white-50 text-small">{award.description && <p className="mt-2">{award.description}</p>}</div>
        </div>
    );
}
