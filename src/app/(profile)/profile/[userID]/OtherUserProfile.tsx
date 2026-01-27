"use client";

import Awards from "@/components/ui/other-user-profile/parent/Awards";
import BasicInfo from "@/components/ui/other-user-profile/parent/BasicInfo";
import Skills from "@/components/ui/other-user-profile/parent/Skills";
import ConnectionCountAndButtons from "@/components/ui/other-user-profile/parent/ConnectionCountAndButtons";
import UserNameAndPhoto from "@/components/ui/other-user-profile/parent/UserNameAndPhoto";
import Works from "@/components/ui/other-user-profile/parent/Works";
import Educations from "@/components/ui/other-user-profile/parent/Educations";
import UserIDProvider from "@/context/UserIDProvider";

export default function OtherUserProfile({ userID }: { userID: string }) {
    return (
        <UserIDProvider userID={userID}>
            <div className="flex flex-col items-start gap-5">
                <section>
                    <UserNameAndPhoto />
                </section>

                <section>
                    <ConnectionCountAndButtons />
                </section>

                <section className="w-full">
                    <BasicInfo />
                </section>

                <section className="w-full">
                    <Works />
                </section>

                <section className="w-full">
                    <Educations />
                </section>

                <section className="w-full">
                    <Skills />
                </section>

                <section className="w-full">
                    <Awards />
                </section>
            </div>
        </UserIDProvider>
    );
}
