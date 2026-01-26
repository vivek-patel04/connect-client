"use client";

interface PropsType {
    label?: string;
    value?: string | null;
    placeholder?: string;
    maxLength?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ label = "", value = "", placeholder = "", onChange = () => {}, maxLength = 250 }: PropsType) {
    return (
        <div>
            <div className={`${!label && "hidden"}`}>
                <label className={`text-small text-white-50 ml-2`}>{label}</label>
            </div>

            <textarea
                className="text-area-user"
                placeholder={placeholder}
                autoComplete="off"
                maxLength={maxLength}
                value={value ? value : ""}
                onChange={onChange}
            />
        </div>
    );
}

export default TextArea;
