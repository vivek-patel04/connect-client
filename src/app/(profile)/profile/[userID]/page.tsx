import ClientPage from "./ClientPage";

export default async function profile({ params }: { params: Promise<{ userID: string }> }) {
    const { userID } = await params;

    return <ClientPage userID={userID} />;
}
