import { useDeleteEducationMutation } from "@/hooks/api/user/useDeleteEducation";
import { EducationType } from "@/types/user/types";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";

interface PropsType {
    education: EducationType;
    onClickEdit: (id: string) => void;
}

export default function EducationCard({ education, onClickEdit }: PropsType) {
    const { mutateAsync, isPending } = useDeleteEducationMutation();

    const handleOnDelete = async () => {
        if (isPending) return;
        try {
            await mutateAsync({ educationID: education.id });
        } catch (error) {}
    };

    const formattedStartDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(education.startDate || 0));

    const formattedEndDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(education.endDate || 0));

    let instituteType = "";
    switch (education.instituteType) {
        case "school":
            instituteType = "School";
            break;
        case "highSchool":
            instituteType = "High School";
            break;
        case "bootcamp":
            instituteType = "Bootcamp";
            break;
        case "university":
            instituteType = "University";
            break;
        default:
            instituteType = "Other";
            break;
    }

    return (
        <div className="backdrop-blue-1">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-heading">{education.institute}</p>

                    <div className="text-white-50 flex items-end gap-1">
                        <p>{instituteType},</p>

                        <div className="text-[0.7rem] flex gap-1">
                            <p>{formattedStartDate}</p>
                            <p>to</p>
                            <p>{education.endDate ? formattedEndDate : "now"}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-1">
                    <button
                        className="btn-icon"
                        onClick={() => {
                            onClickEdit(education.id);
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
                {education.description && (
                    <div className="mt-3 ">
                        <p className="text-justify text-white-20 text-small">{education.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
