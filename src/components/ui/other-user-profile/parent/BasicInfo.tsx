"use client";

import { useGetUserProfileQuery } from "@/hooks/api/user/useGetUserProfileQuery";
import { useUserIDContext } from "@/context/UserIDProvider";
import ErrorMessage from "../../error/ErrorMessage";

function BasicInfo() {
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

    if (!user) return;

    const { dob, gender, hometown, languages, interests } = user.personalData;

    let showBasicInfo = true;
    if (!dob && !gender && !hometown && languages.length === 0 && interests.length === 0) {
        showBasicInfo = false;
    }

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(dob || 0));

    return (
        <div className=" backdrop-white-1">
            <div className="text-heading font-semibold">
                <h1>Basic Information</h1>
            </div>

            <div className={`mt-6 ${showBasicInfo ? "hidden" : "block"}`}>
                <p className="text-small text-white-50">User has not added any information.</p>
            </div>

            <div className={`mt-6 backdrop-blue-1 ${showBasicInfo ? "block" : "hidden"}`}>
                <table>
                    <tbody>
                        {gender && (
                            <tr>
                                <td className="text-small text-white-50 py-[2px]">Gender</td>

                                <td className="py-[2px] text-small">&nbsp;&nbsp;:&nbsp;&nbsp;{gender === "male" ? "Male" : "Female"}</td>
                            </tr>
                        )}

                        {dob && (
                            <tr>
                                <td className="text-small text-white-50 py-[2px]">Date of birth</td>

                                <td className="py-[2px] text-small">&nbsp;&nbsp;:&nbsp;&nbsp;{formattedDate}</td>
                            </tr>
                        )}

                        {hometown && (
                            <tr>
                                <td className="text-small text-white-50 py-[2px]">Hometown</td>

                                <td className="py-[2px] text-small">&nbsp;&nbsp;:&nbsp;&nbsp;{hometown} </td>
                            </tr>
                        )}

                        {languages.length > 0 && (
                            <tr>
                                <td className="text-small text-white-50 py-[2px]">Languages</td>

                                <td className="py-[2px] text-small">
                                    &nbsp;&nbsp;:&nbsp;&nbsp;
                                    {languages.map((language: string, index: number) => (
                                        <span key={index} className="">
                                            {language},&nbsp;
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        )}

                        {interests.length > 0 && (
                            <tr>
                                <td className="text-small text-white-50 py-[2px]">Interests</td>

                                <td className="py-[2px] text-small">
                                    &nbsp;&nbsp;:&nbsp;&nbsp;
                                    {interests.map((intrest: string, index: number) => (
                                        <span key={index} className="">
                                            {intrest},&nbsp;
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BasicInfo;
