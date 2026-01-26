import UserSuggestions from "@/components/ui/common/UserSuggestions";
import ReceivedRequests from "@/components/ui/connections/parent/ReceivedRequests";
import RedirectToConnection from "@/components/ui/connections/parent/RedirectToConnection";
import RedirectToSentRequest from "@/components/ui/connections/parent/RedirectToSentRequest";
import UserSuggestionsMobile from "@/components/ui/connections/parent/UserSuggestionsMobile";

export default function ConnectionsPage() {
    return (
        <div className="flex items-start gap-10">
            <section className="w-[316px] hidden md:block">
                <div className="backdrop-heading">
                    <h1 className="font-semibold">Suggestions</h1>
                </div>

                <div className="mt-1.5">
                    <UserSuggestions />
                </div>
            </section>

            <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-10">
                <div className="flex gap-2">
                    <RedirectToConnection />
                    <RedirectToSentRequest />
                </div>

                <div className="flex flex-col gap-3">
                    <section className="w-[316px] md:hidden">
                        <UserSuggestionsMobile />
                    </section>

                    <section className="w-[316px] lg:w-[380px]">
                        <div className="backdrop-heading">
                            <h1 className="font-semibold">Received Requests</h1>
                        </div>

                        <div className="mt-1.5">
                            <ReceivedRequests />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
