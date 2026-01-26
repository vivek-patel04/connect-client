"use client";

interface TextInputType {
    label?: string;
    value?: string | null;
    placeholder?: string;
    maxLength?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ label = "", value = "", placeholder = "", onChange = () => {}, maxLength = 150 }: TextInputType) {
    return (
        <div>
            <div className={`${!label && "hidden"}`}>
                <label className={`text-small text-white-50 ml-2`}>{label}</label>
            </div>

            <input
                type="text"
                placeholder={placeholder}
                value={value ? value : ""}
                autoComplete="off"
                maxLength={maxLength}
                onChange={onChange}
                className="input-text"
                onKeyDown={e => {
                    if (e.key === "Enter") e.preventDefault();
                }}
            />
        </div>
    );
}

export default TextInput;
