import { GoComment } from "react-icons/go";

interface PropsType {
    count: number;
    onClick: () => void;
}
export default function CommentIconAndCount({ count, onClick }: PropsType) {
    return (
        <div className="flex items-center gap-1">
            <button onClick={onClick} className="hover:cursor-pointer">
                <GoComment size={18} />
            </button>

            <button className=" text-white-50 hover:cursor-pointer" onClick={onClick}>
                {count}
            </button>
        </div>
    );
}
