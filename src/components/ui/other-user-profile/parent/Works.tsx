"use client";

import { useMemo } from "react";
import WorkCard from "../child/WorkCard";
import { useUserProfileContext } from "@/context/UserProfileProvider";

export default function Works() {
    const { userProfile } = useUserProfileContext();

    const workExperience = userProfile.personalData.workExperience;

    const sortedWorkExp = useMemo(() => {
        const sorted = [...workExperience].sort((a, b) => {
            const aEnd = a.endDate ? new Date(a.endDate) : new Date();
            const bEnd = b.endDate ? new Date(b.endDate) : new Date();

            const diff = bEnd.getTime() - aEnd.getTime();

            if (diff !== 0) return diff;

            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });

        return sorted;
    }, [workExperience]);

    return (
        <div className="backdrop-white-1">
            <div className=" flex justify-between items-start relative">
                <h1 className="text-heading font-semibold">Work Experience</h1>
            </div>

            <div className={`mt-6 ${workExperience.length !== 0 && "hidden"}`}>
                <p className="text-small text-white-50">User has not added any information.</p>
            </div>

            <ul className={`mt-6 ${workExperience.length === 0 && "hidden"} flex flex-col gap-4`}>
                {sortedWorkExp.map(work => (
                    <li key={work.id}>
                        <WorkCard work={work} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
