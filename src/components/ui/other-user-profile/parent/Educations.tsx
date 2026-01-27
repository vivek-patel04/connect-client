"use client";

import { useGetUserProfileQuery } from "@/hooks/api/user/useGetUserProfileQuery";
import { useUserIDContext } from "@/context/UserIDProvider";
import EducationCard from "../child/EducationCard";
import { useMemo } from "react";
import ErrorMessage from "../../error/ErrorMessage";

export default function Educations() {
    const { userID } = useUserIDContext();
    const { data: user, isLoading, error } = useGetUserProfileQuery(userID);

    const educations = user?.personalData?.education;

    const sortedEducation = useMemo(() => {
        if (!educations) return [];

        const sorted = [...educations].sort((a, b) => {
            const aEnd = a.endDate ? new Date(a.endDate) : new Date();
            const bEnd = b.endDate ? new Date(b.endDate) : new Date();

            const diff = bEnd.getTime() - aEnd.getTime();

            if (diff !== 0) return diff;

            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });

        return sorted;
    }, [educations]);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5">
                <div className="loading-card-white">
                    <div className="loading-line-small"></div>
                    <div className="loading-line-mid mt-3"></div>
                </div>
            </div>
        );
    }

    if (error) {
        console.log(error);
        return <ErrorMessage />;
    }

    return (
        <div className="backdrop-white-1">
            <div className=" flex justify-between items-start relative">
                <h1 className="text-heading font-semibold">Education</h1>
            </div>

            <div className={`mt-6 ${sortedEducation.length !== 0 && "hidden"}`}>
                <p className="text-small text-white-50">User has not added any information.</p>
            </div>

            <ul className={`mt-6 ${sortedEducation.length === 0 && "hidden"} flex flex-col gap-4`}>
                {sortedEducation.map(edu => (
                    <li key={edu.id}>
                        <EducationCard education={edu} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
