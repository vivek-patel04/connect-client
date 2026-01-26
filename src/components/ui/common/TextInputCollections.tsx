"use client";

import { LuTrash2 } from "react-icons/lu";

interface propsType {
    label?: string;
    value?: string[];
    maxInputs?: number;
    maxLengthPerInput?: number;
    onChange?: (newInput: string, index: number) => void;
    onDelete?: (index: number) => void;
    onAdd?: () => void;
}

export default function TextInputCollection({
    label = "",
    value = [],
    maxInputs = 10,
    maxLengthPerInput = 50,
    onChange = () => {},
    onDelete = () => {},
    onAdd = () => {},
}: propsType) {
    return (
        <div className="w-full">
            <div className={`flex flex-col gap-1 items-start text-small text-white-50 ml-2`}>
                <label>{label}</label>
                <p className={`${value.length >= maxInputs && "hidden"} mb-1`}>
                    <span className="hover:cursor-pointer active:text-black md:hover:underline md:hover:decoration-white-60" onClick={onAdd}>
                        Click here
                    </span>{" "}
                    to add new
                </p>
            </div>

            <ul className={`${value.length > 0 ? "block" : "hidden"} flex flex-col gap-2`}>
                {value.map((v, idx) => (
                    <li key={idx} className="flex items-center relative">
                        <div className="w-full">
                            <input
                                type="text"
                                value={v}
                                className="input-text"
                                maxLength={maxLengthPerInput}
                                onChange={e => {
                                    onChange(e.target.value, idx);
                                }}
                                onKeyDown={e => {
                                    if (e.key === "Enter") e.preventDefault();
                                    if (e.key === "Backspace" && v.length === 0) {
                                        onDelete(idx);
                                    }
                                }}
                            />
                        </div>

                        <div
                            onClick={() => {
                                onDelete(idx);
                            }}
                            className="h-[31px] p-2 rounded-2xl flex items-center hover:cursor-pointer active:bg-black/5 absolute right-1"
                        >
                            <div className="text-white-60">
                                <LuTrash2 size={16} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
