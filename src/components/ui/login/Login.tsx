"use client";

import { useState } from "react";
import { loginInputValidator } from "@/input-validation/auth/inputValidators";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/hooks/api/auth/useLoginMutation";
import AuthShowPassword from "../common/AuthShowPassword";

export default function Login() {
    const router = useRouter();
    const { mutateAsync, isPending } = useLoginMutation();

    const [input, setInput] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setInput(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) {
            return;
        }
        setErrorMessage("");
        const { data, error } = loginInputValidator(input);
        if (error) {
            setErrorMessage(`* ${error.issues[0].message}`);
            return;
        }
        try {
            await mutateAsync(data);
            setInput({ email: "", password: "" });
            router.push("/feed");
        } catch (error: any) {
            setErrorMessage(`* ${error.message}`);
            setInput(prev => ({ ...prev, password: "" }));
        }
    };
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" className="input-auth" placeholder="Enter your email" value={input.email} onChange={e => handleOnChangeInput(e, "email")} />

                <input
                    type={showPassword ? "text" : "password"}
                    className="input-auth mt-3"
                    placeholder="Enter your password"
                    value={input.password}
                    onChange={e => handleOnChangeInput(e, "password")}
                />

                <div className="mt-3">
                    <AuthShowPassword showPassword={showPassword} onChange={() => setShowPassword(prev => !prev)} />
                </div>

                {errorMessage && (
                    <div className="mt-3 text-[red] text-small">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <input
                    type="submit"
                    value={isPending ? "Logging in" : "Log in"}
                    className={`${isPending ? "btn-auth-disable" : "btn-auth"} mt-3`}
                    disabled={isPending}
                />
            </form>
        </div>
    );
}
