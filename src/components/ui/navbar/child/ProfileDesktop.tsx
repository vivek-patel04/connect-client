import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import Link from "next/link";

export default function ProfileDesktop() {
    const { data } = useGetMeQuery();

    if (!data) {
        return <div className="nav-item-desktop">Profile</div>;
    }

    return (
        <div className="nav-item-desktop">
            <Link href={`/profile/${data.id}`}>Profile</Link>
        </div>
    );
}
