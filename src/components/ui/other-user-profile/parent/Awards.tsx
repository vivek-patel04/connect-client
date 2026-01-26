"use client";

import { useUserProfileContext } from "@/context/UserProfileProvider";
import AwardCard from "../child/AwardCard";

export default function Awards() {
    const { userProfile } = useUserProfileContext();

    const awards = userProfile.personalData.awards;

    return (
        <div className="backdrop-white-1">
            <div className=" flex justify-between items-start relative">
                <h1 className="text-heading font-semibold">Awards and Recognitions</h1>
            </div>

            <div className={`mt-6 ${awards.length !== 0 && "hidden"}`}>
                <p className="text-small text-white-50">User has not added any information.</p>
            </div>

            <ul className={`mt-6 ${awards.length === 0 && "hidden"} flex flex-col gap-4`}>
                {awards.map(award => (
                    <li key={award.id}>
                        <AwardCard award={award} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
