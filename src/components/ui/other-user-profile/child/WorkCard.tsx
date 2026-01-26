"use client";

import { WorkExperienceType } from "@/types/user/types";

interface PropsType {
    work: WorkExperienceType;
}

function WorkCard({ work }: PropsType) {
    const formattedStartDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(work.startDate || 0));

    const formattedEndDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(work.endDate || 0));

    return (
        <div className="backdrop-blue-1">
            <div>
                <div className="text-heading">
                    <p>{work.role}</p>
                </div>

                <div className="text-small text-white-50 flex items-end">
                    <p>{work.organization}</p>
                    <p className="mr-1">{","}</p>
                    <p>{work.location}</p>
                    <p className="mr-1">{","}</p>
                    <p className="text-[0.7rem] mr-1">{formattedStartDate}</p>
                    <p className="text-[0.7rem] mr-1">to</p>
                    <p className=" text-[0.7rem]">{work.endDate ? formattedEndDate : "now"}</p>
                </div>
            </div>

            <div>
                {work.description && (
                    <div className="mt-3 text-white-20 text-small">
                        <p className="text-justify">{work.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkCard;
