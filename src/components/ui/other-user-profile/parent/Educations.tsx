"use client";

import { useUserProfileContext } from "@/context/UserProfileProvider";
import EducationCard from "../child/EducationCard";
import { useMemo } from "react";

export default function Educations() {
    const { userProfile } = useUserProfileContext();
    const educations = userProfile.personalData.education;

    const sortedEducation = useMemo(() => {
        const sorted = [...educations].sort((a, b) => {
            const aEnd = a.endDate ? new Date(a.endDate) : new Date();
            const bEnd = b.endDate ? new Date(b.endDate) : new Date();

            const diff = bEnd.getTime() - aEnd.getTime();

            if (diff !== 0) return diff;

            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });

        return sorted;
    }, [educations]);

    return (
        <div className="backdrop-white-1">
            <div className=" flex justify-between items-start relative">
                <h1 className="text-heading font-semibold">Education</h1>
            </div>

            <div className={`mt-6 ${educations.length !== 0 && "hidden"}`}>
                <p className="text-small text-white-50">User has not added any information.</p>
            </div>

            <ul className={`mt-6 ${educations.length === 0 && "hidden"} flex flex-col gap-4`}>
                {sortedEducation.map(edu => (
                    <li key={edu.id}>
                        <EducationCard education={edu} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
