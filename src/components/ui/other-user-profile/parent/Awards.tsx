"use client";

import { useGetUserProfileQuery } from "@/hooks/api/user/useGetUserProfileQuery";
import { useUserIDContext } from "@/context/UserIDProvider";
import AwardCard from "../child/AwardCard";
import ErrorMessage from "../../error/ErrorMessage";

export default function Awards() {
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

    const awards = user?.personalData?.awards || [];

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
