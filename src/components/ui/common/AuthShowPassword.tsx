"use client";
interface PropsType {
    showPassword: boolean;
    onChange: () => void;
}

export default function AuthShowPassword({ showPassword, onChange }: PropsType) {
    return (
        <div className="flex items-center gap-1 ">
            <input type="checkbox" id="show-password" checked={showPassword} onChange={onChange} className="block accent-black h-3 w-3 hover:cursor-pointer" />
            <label htmlFor="show-password" className="block text-small hover:cursor-pointer">
                Show password
            </label>
        </div>
    );
}
