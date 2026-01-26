import ProfilePhotoAndNameLoading from "@/components/ui/loading/ProfilePhotoAndNameLoading";

export default function Loading() {
    return (
        <div className="flex flex-col gap-5">
            <ProfilePhotoAndNameLoading />

            <div>
                <div className="loading-line-small" />
                <div className="loading-line-mid mt-3" />
            </div>

            <div>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="loading-card-white">
                        <div className="loading-line-small" />
                        <div className="loading-line-mid mt-3" />
                    </div>
                ))}
            </div>
        </div>
    );
}
