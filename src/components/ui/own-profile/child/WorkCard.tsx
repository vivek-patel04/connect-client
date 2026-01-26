"use client";

import { useDeleteWorkMutation } from "@/hooks/api/user/useDeleteWork";
import { WorkExperienceType } from "@/types/user/types";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";

interface PropsType {
    work: WorkExperienceType;
    onClickEdit: (id: string) => void;
}

function WorkCard({ work, onClickEdit }: PropsType) {
    const { mutateAsync, isPending } = useDeleteWorkMutation();

    const handleOnDelete = async () => {
        if (isPending) return;
        try {
            await mutateAsync({ workID: work.id });
        } catch (error) {}
    };

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
            <div className="flex justify-between items-start">
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

                <div className="flex gap-1">
                    <button
                        className="btn-icon"
                        onClick={() => {
                            onClickEdit(work.id);
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
                {work.description && (
                    <div className="mt-3 ">
                        <p className="text-justify text-white-20 text-small">{work.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkCard;
