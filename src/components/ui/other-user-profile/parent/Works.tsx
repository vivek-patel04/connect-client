"use client";

import { useMemo } from "react";
import WorkCard from "../child/WorkCard";
import { useGetUserProfileQuery } from "@/hooks/api/user/useGetUserProfileQuery";
import { useUserIDContext } from "@/context/UserIDProvider";
import ErrorMessage from "../../error/ErrorMessage";

export default function Works() {
    const { userID } = useUserIDContext();
    const { data: user, isLoading, error } = useGetUserProfileQuery(userID);

    const workExperience = user?.personalData?.workExperience;

    const sortedWorkExp = useMemo(() => {
        if (!workExperience) return [];

        const sorted = [...workExperience].sort((a, b) => {
            const aEnd = a.endDate ? new Date(a.endDate) : new Date();
            const bEnd = b.endDate ? new Date(b.endDate) : new Date();

            const diff = bEnd.getTime() - aEnd.getTime();

            if (diff !== 0) return diff;

            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });

        return sorted;
    }, [workExperience]);

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
                <h1 className="text-heading font-semibold">Work Experience</h1>
            </div>

            <div className={`mt-6 ${sortedWorkExp.length !== 0 && "hidden"}`}>
                <p className="text-small text-white-50">User has not added any information.</p>
            </div>

            <ul className={`mt-6 ${sortedWorkExp.length === 0 && "hidden"} flex flex-col gap-4`}>
                {sortedWorkExp.map(work => (
                    <li key={work.id}>
                        <WorkCard work={work} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
