"use client";

import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import Image from "next/image";
import ProfilePhotoAndNameLoading from "../loading/ProfilePhotoAndNameLoading";
import ErrorMessage from "../error/ErrorMessage";

export default function ViewerPhotoAndName() {
    const { data: me, isLoading, error } = useGetMeQuery();

    if (isLoading) return <ProfilePhotoAndNameLoading />;

    if (error) {
        console.log(error);
        return <ErrorMessage message={"Something went wrong, error on loading profile photo and name."} />;
    }

    if (!me) return null;

    return (
        <div className="py-5 bg-white max-w-[316px] w-full border border-white-85 rounded-2xl flex items-center justify-center">
            <div className="flex flex-col gap-3 items-center">
                <div className=" w-[120px] h-[120px] rounded-full relative overflow-hidden">
                    <Image src={me.personalData.profilePictureURL} alt="profile-picture" fill={true} className="object-cover" />
                </div>

                <div className="text-heading font-bold">
                    <span>{me.name}</span>
                </div>
            </div>
        </div>
    );
}
