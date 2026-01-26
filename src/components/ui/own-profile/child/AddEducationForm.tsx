import DateInput from "@/components/ui/common/DateInput";
import DropDownInput from "@/components/ui/common/DropDownInput";
import TextArea from "@/components/ui/common/TextArea";
import TextInput from "@/components/ui/common/TextInput";
import { useAddEducationMutation } from "@/hooks/api/user/useAddEducationMutation";
import { educationInputValidation } from "@/input-validation/user/inputValidators";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const instituteOptions = [
    { value: "school", label: "School" },
    { value: "highSchool", label: "High school" },
    { value: "university", label: "University" },
    { value: "bootcamp", label: "Bootcamp" },
    { value: "other", label: "Other" },
];

export default function AddEducationForm({ onCancel }: { onCancel: () => void }) {
    const { mutateAsync, isPending } = useAddEducationMutation();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [htmlElement, setHtmlElement] = useState<HTMLElement | null>(null);

    const [inputs, setInputs] = useState({
        institute: "",
        instituteType: null as string | null,
        startDate: null as string | null,
        endDate: null as string | null,
        description: "",
    });

    useEffect(() => {
        setHtmlElement(document.getElementById("modal"));
        document.body.classList.add("lock-scroll");

        return () => {
            document.body.classList.remove("lock-scroll");
        };
    }, []);

    if (!htmlElement) return null;

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPending) return;
        setErrorMessage(null);

        const { success, data, error } = educationInputValidation(inputs);

        if (!success) {
            setErrorMessage(error.issues[0].message);
            return;
        }
        try {
            await mutateAsync(data);
            onCancel();
        } catch (error) {}
    };
    return createPortal(
        <div className="modal-bg flex justify-center items-center">
            <div className="backdrop-white-1 max-w-[520px] max-h-[90dvh] overflow-y-auto no-scrollbar">
                <div className="flex justify-center">
                    <h2 className="text-heading font-semibold"> Add Education</h2>
                </div>
                <form className="mt-4" onSubmit={handleOnSubmit}>
                    <div>
                        <TextInput
                            label="Institute name*"
                            value={inputs.institute}
                            onChange={e => setInputs(p => ({ ...p, institute: e.target.value }))}
                            maxLength={50}
                        />
                    </div>

                    <div className="mt-4">
                        <DropDownInput
                            label="Type*"
                            options={instituteOptions}
                            value={inputs.instituteType}
                            onChange={selected => setInputs(p => ({ ...p, instituteType: selected }))}
                        />
                    </div>

                    <div className="mt-4">
                        <DateInput
                            label="Start date* (DD-MM-YYYY)"
                            value={inputs.startDate}
                            onChange={newDate =>
                                setInputs(p => ({ ...p, startDate: newDate ? newDate.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10) }))
                            }
                        />
                    </div>

                    <div className="mt-4">
                        <DateInput
                            label="End date (DD-MM-YYYY)"
                            value={inputs.endDate}
                            onChange={newDate => setInputs(p => ({ ...p, endDate: newDate ? newDate.toISOString().slice(0, 10) : null }))}
                        />
                    </div>

                    <div className="mt-4">
                        <TextArea
                            label="Description"
                            value={inputs.description}
                            onChange={e => setInputs(p => ({ ...p, description: e.target.value }))}
                            maxLength={750}
                        />
                    </div>

                    <div className={`mt-3 ${errorMessage ? "block" : "hidden"}`}>
                        <p className="text-red-500">{errorMessage}</p>
                    </div>

                    <div className="mt-3 flex gap-3">
                        <input type="submit" value={isPending ? "Saving" : "Save"} className="btn" disabled={isPending} />

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
