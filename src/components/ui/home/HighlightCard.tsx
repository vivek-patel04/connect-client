export default function HighlightCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="max-w-[300px] min-h-[200px] bg-white rounded-2xl shadow-1 px-10 py-5 md:hover:-translate-y-2 transition-transform duration-200">
            <div className="flex justify-center">
                <span className="text-[32px] text-white-20">{icon}</span>
            </div>

            <div className="mt-3 ">
                <p className="text-center">
                    <strong className="font-bold text-heading">{title}</strong>
                </p>
            </div>

            <div className="mt-3">
                <p className="text-center text-white-50">{description}</p>
            </div>
        </div>
    );
}
