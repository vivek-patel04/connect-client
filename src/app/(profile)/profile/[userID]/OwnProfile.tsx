import ViewerPhotoAndName from "@/components/ui/common/ViewerPhotoAndName";
import Awards from "@/components/ui/own-profile/parent/Awards";
import BasicInfo from "@/components/ui/own-profile/parent/BasicInfo";
import ConnectionsAndButtons from "@/components/ui/own-profile/parent/ConnectionsAndButtons";
import Education from "@/components/ui/own-profile/parent/Education";
import Skills from "@/components/ui/own-profile/parent/Skills";
import Work from "@/components/ui/own-profile/parent/Work";

export default function OwnProfile() {
    return (
        <div className="flex flex-col items-start gap-5">
            <section className="w-full">
                <ViewerPhotoAndName />
            </section>

            <section className="w-full">
                <ConnectionsAndButtons />
            </section>

            <section className="w-full">
                <BasicInfo />
            </section>

            <section className="w-full">
                <Work />
            </section>

            <section className="w-full">
                <Education />
            </section>

            <section className="w-full">
                <Skills />
            </section>

            <section className="w-full">
                <Awards />
            </section>
        </div>
    );
}
