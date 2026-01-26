import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { safeFetchWithCookie } from "@/utils/safeFetchWithCookie";
import { safeFetch } from "@/utils/safeFetch";
import { UserProfileType } from "@/types/user/types";
import { clientBaseUrl } from "@/utils/baseURL";
import UserProfileProvider from "@/context/UserProfileProvider";
import Awards from "@/components/ui/other-user-profile/parent/Awards";
import BasicInfo from "@/components/ui/other-user-profile/parent/BasicInfo";
import Skills from "@/components/ui/other-user-profile/parent/Skills";
import ConnectionCountAndButtons from "@/components/ui/other-user-profile/parent/ConnectionCountAndButtons";
import UserNameAndPhoto from "@/components/ui/other-user-profile/parent/UserNameAndPhoto";
import Works from "@/components/ui/other-user-profile/parent/Works";
import Educations from "@/components/ui/other-user-profile/parent/Educations";

const clientBaseURL = clientBaseUrl;

export default async function profile({ params }: { params: Promise<{ userID: string }> }) {
    const { userID } = await params;

    const rawCookieFromBrowser = (await headers()).get("cookie");

    //API CALL TO GET ME
    const meResponse = await safeFetchWithCookie(rawCookieFromBrowser, `${clientBaseURL}/bff/api/user/get-me`);

    if (meResponse?.status === 401) {
        redirect(`/bff/api/auth/refresh-redirect?path=/profile/${userID}`);
    }

    //API CALL TO GET USER PROFILE
    const userProfileResponse = await safeFetch(`${clientBaseURL}/bff/api/user/get-user-profile?userID=${userID}`);

    // //HANDLE ERROR OR WRONG USER ID IN URL
    if (!userProfileResponse || !userProfileResponse.ok) {
        redirect(`/not-found`);
    }

    const userProfile: UserProfileType = userProfileResponse.data.userProfile;
    const me: UserProfileType = meResponse?.data?.me;

    if (me && userProfile.id === me.id) {
        redirect(`/profile`);
    }

    return (
        <UserProfileProvider userProfile={userProfile}>
            <div className="container flex flex-col items-start gap-5">
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
        </UserProfileProvider>
    );
}
