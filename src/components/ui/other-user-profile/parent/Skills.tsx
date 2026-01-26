"use client";

import SkillCard from "../child/SkillCard";
import { useUserProfileContext } from "@/context/UserProfileProvider";

export default function Skills() {
    const { userProfile } = useUserProfileContext();

    const skills = userProfile.personalData.skills;

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
