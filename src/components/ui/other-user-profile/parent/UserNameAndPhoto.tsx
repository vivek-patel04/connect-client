"use client";

import Image from "next/image";
import { useUserProfileContext } from "@/context/UserProfileProvider";

export default function UserNameAndPhoto() {
    const { userProfile: user } = useUserProfileContext();
    return (
        <div className="py-5 bg-white w-[316px] border border-white-85 rounded-2xl flex items-center justify-center">
            <div className="flex flex-col gap-3 items-center">
                <div className=" w-[120px] h-[120px] rounded-full relative overflow-hidden">
                    <Image src={user.personalData.profilePictureURL} alt="profile-picture" fill={true} className="object-cover" />
                </div>

                <div className="text-heading font-bold">
                    <span>{user.name}</span>
                </div>
            </div>
        </div>
    );
}
