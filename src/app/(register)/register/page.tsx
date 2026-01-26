import RedirectToLoginButton from "@/components/ui/register/RedirectToLoginButton";
import Register from "@/components/ui/register/Register";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SiGitconnected } from "react-icons/si";

export default async function page() {
    const rawCookiefromBrowser = (await headers()).get("cookie");

    if (rawCookiefromBrowser?.includes("refreshToken=")) {
        redirect("/feed");
    }
    return (
        <div className="backdrop-auth max-w-[420px]">
            <div className="flex flex-col justify-center items-center">
                <div className="flex items-center gap-1.5">
                    <span className="text-[26px]">
                        <SiGitconnected />
                    </span>
                    <span>
                        <strong className="text-xl font-bold">Connect</strong>
                    </span>
                </div>

                <h2 className="text-white-50">Create your account</h2>
            </div>

            <div className="mt-5">
                <Register />
            </div>

            <div className="mt-3 text-white-85">
                <hr />
            </div>

            <div className="mt-3">
                <p>Already have an account?</p>
                <div className="mt-3">
                    <RedirectToLoginButton />
                </div>
            </div>
        </div>
    );
}
