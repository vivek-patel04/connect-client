"use client";

import { useUpdateProfilePictureMutation } from "@/hooks/api/user/useUpdateProfilePictureMutation";
import { profilePhotoInputValidation } from "@/input-validation/user/inputValidators";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function UpdateProfilePictureForm({ onCancel }: { onCancel: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [htmlElement, setHtmlElement] = useState<HTMLElement | null>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { mutateAsync, isPending } = useUpdateProfilePictureMutation();

    useEffect(() => {
        setHtmlElement(document.getElementById("modal"));
        document.body.classList.add("lock-scroll");

        return () => {
            document.body.classList.remove("lock-scroll");
        };
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setErrorMessage(null);

        if (isPending) {
            return;
        }

        if (!file) {
            setErrorMessage("Please select a file");
            return;
        }

        const { success, error } = profilePhotoInputValidation({ file });

        if (!success) {
            setErrorMessage(error.issues[0].message);
            return;
        }

        try {
            await mutateAsync({ file });
            onCancel();
        } catch (error) {
            console.log(error);
            onCancel();
        }
    };

    if (!htmlElement) return null;
    return createPortal(
        <div className="modal-bg flex justify-center items-center">
            <div className="backdrop-white-1 max-w-[520px] max-h-[90dvh] overflow-y-auto no-scrollbar">
                <div className="flex justify-center">
                    <h2 className="text-heading font-semibold"> Update Profile Picture</h2>
                </div>

                <form className="mt-4">
                    <div>
                        <label className="text-white-50 text-small ml-2">Click on the box to select photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setFile(e.target.files?.[0] || null)}
                            className="
                                input-text text-white-85
                                file:mr-4 file:p-1
                                file:border-0
                                file:bg-body file:text-white-50"
                        />
                    </div>
                    <div className={`mt-3 ${errorMessage ? "block" : "hidden"}`}>
                        <p className="text-red-500">{errorMessage}</p>
                    </div>

                    <div className="mt-5 flex gap-3">
                        <button className="btn" disabled={isPending} onClick={handleSubmit} type="submit">
                            {isPending ? "Saving" : "Save"}
                        </button>

                        <button type="button" onClick={onCancel} className="btn">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        htmlElement
    );
}
