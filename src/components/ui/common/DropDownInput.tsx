"use client";

import { useEffect, useRef, useState } from "react";

interface PropsType {
    label?: string;
    value?: string | null;
    placeholder?: string;
    options?: { label: string; value: string }[];
    onChange?: (selected: string) => void;
}

export default function DropDownInput({ label = "", value = "", options = [], onChange = () => {}, placeholder = "" }: PropsType) {
    const [showOption, setShowOption] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowOption(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const inputValue = options.find(option => option.value === value);

    return (
        <div className="w-full relative" ref={dropdownRef}>
            <div className={`${label ? "block" : "hidden"}`}>
                <label className={`text-small text-white-50 ml-2`}>{label}</label>
            </div>

            <div>
                <input
                    type="text"
                    placeholder={placeholder}
                    className="input-text"
                    onClick={() => setShowOption(p => !p)}
                    value={inputValue ? inputValue.label : ""}
                    onChange={() => {}}
                    onKeyDown={e => {
                        if (e.key === "Enter") e.preventDefault();
                    }}
                />
            </div>

            <div className={`${showOption ? "block" : "hidden"} dropdown-bg`}>
                {options.map((option, index) => (
                    <p
                        key={index}
                        className="dropdown-el"
                        onClick={() => {
                            onChange(option.value);
                            setShowOption(false);
                        }}
                    >
                        {option.label}
                    </p>
                ))}
            </div>
        </div>
    );
}
