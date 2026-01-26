export default function ErrorMessage({ message = "Something went wrong. Please try again later." }: { message?: string }) {
    return (
        <div className="flex items-center justify-center p-5 text-center">
            <p className="text-white-50">{message}</p>
        </div>
    );
}
