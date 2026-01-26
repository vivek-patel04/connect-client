"use client";

import { useState } from "react";
import BasicInfoCard from "../child/BasicInfoCard";
import BasicInfoUpdateForm from "../child/BasicInfoUpdateForm";
import { LuPencilLine } from "react-icons/lu";
import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import ErrorMessage from "../../error/ErrorMessage";

function BasicInfo() {
    const [isUpdateUserBasicInfo, setIsUpdatebasicInfo] = useState(false);
    const { data, isLoading, error } = useGetMeQuery();

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

    if (!data) return;

    const { dob, gender, hometown, languages, interests } = data.personalData;
    let showBasicInfo = true;
    if (!dob && !gender && !hometown && languages.length === 0 && interests.length === 0) {
        showBasicInfo = false;
    }

    return (
        <div className="backdrop-white-1">
            <div className="flex justify-between items-start relative">
                <h1 className="text-heading font-semibold">Basic Information</h1>

                {!isUpdateUserBasicInfo && (
                    <button className="btn-icon absolute -top-1 right-0" onClick={() => setIsUpdatebasicInfo(true)}>
                        <LuPencilLine size={17} />
                    </button>
                )}
            </div>

            <div>
                {isUpdateUserBasicInfo ? (
                    <div className="mt-6">
                        <BasicInfoUpdateForm closeForm={() => setIsUpdatebasicInfo(false)} />
                    </div>
                ) : (
                    <div className={`mt-6 ${showBasicInfo ? "block" : "hidden"}`}>
                        <BasicInfoCard />
                    </div>
                )}
            </div>
        </div>
    );
}

export default BasicInfo;
