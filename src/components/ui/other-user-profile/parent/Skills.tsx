"use client";

import SkillCard from "../child/SkillCard";
import { useGetUserProfileQuery } from "@/hooks/api/user/useGetUserProfileQuery";
import { useUserIDContext } from "@/context/UserIDProvider";
import ErrorMessage from "../../error/ErrorMessage";

export default function Skills() {
    const { userID } = useUserIDContext();
    const { data: user, isLoading, error } = useGetUserProfileQuery(userID);

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

    const skills = user?.personalData?.skills || [];

    return (
        <div className="backdrop-white-1">
            <div className=" flex justify-between items-start relative">
                <h1 className="text-heading font-semibold">Professional Skills</h1>
            </div>

            <div className={`mt-6 ${skills.length !== 0 && "hidden"}`}>
                <p className="text-small text-white-50">User has not added any information.</p>
            </div>

            <ul className={`mt-6 ${skills.length === 0 && "hidden"} flex flex-col gap-4`}>
                {skills.map(skill => (
                    <li key={skill.id}>
                        <SkillCard skill={skill} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
