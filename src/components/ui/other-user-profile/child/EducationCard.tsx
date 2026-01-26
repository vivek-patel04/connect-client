import { EducationType } from "@/types/user/types";

interface PropsType {
    education: EducationType;
}

export default function EducationCard({ education }: PropsType) {
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
            <div className="text-heading">
                <p>{education.institute}</p>
            </div>

            <div className="text-white-50 flex items-end gap-1">
                <p>{instituteType},</p>

                <div className="text-[0.7rem] flex gap-1">
                    <p>{formattedStartDate}</p>
                    <p>to</p>
                    <p>{education.endDate ? formattedEndDate : "now"}</p>
                </div>
            </div>

            <div className={`text-white-20 text-small ${education.description && "mt-3"}`}>
                <p>{education.description && education.description}</p>
            </div>
        </div>
    );
}
