import { EducationType } from "@/types/user/types";
import { useState } from "react";
import TextInput from "../../common/TextInput";
import DateInput from "../../common/DateInput";
import TextArea from "../../common/TextArea";
import DropDownInput from "../../common/DropDownInput";
import { useUpdateEducationMutation } from "@/hooks/api/user/useUpdateEducationMutation";
import { educationInputValidation } from "@/input-validation/user/inputValidators";

interface PropsType {
    education: EducationType;
    onCancel: () => void;
}
const instituteOptions = [
    { value: "school", label: "School" },
    { value: "highSchool", label: "High school" },
    { value: "university", label: "University" },
    { value: "bootcamp", label: "Bootcamp" },
    { value: "other", label: "Other" },
];

export default function UpdateEducationForm({ education, onCancel }: PropsType) {
    const [inputs, setInputs] = useState({
        institute: education.institute,
        instituteType: education.instituteType,
        startDate: education.startDate,
        endDate: education.endDate,
        description: education.description,
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { mutateAsync, isPending } = useUpdateEducationMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) return;
        setErrorMessage(null);

        const { success, data, error } = educationInputValidation(inputs);

        if (!success) {
            setErrorMessage(error.issues[0].message);
            return;
        }
        try {
            await mutateAsync({ body: data, educationID: education.id });
            onCancel();
        } catch (error) {}
    };
    return (
        <div className="max-w-[420px] w-full">
            <h2 className="text-heading font-semibold"> Update Education</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div>
                    <TextInput
                        label="Institute name"
                        value={inputs.institute}
                        onChange={e => setInputs(p => ({ ...p, institute: e.target.value }))}
                        maxLength={50}
                    />
                </div>

                <div className="mt-4">
                    <DropDownInput
                        label="Type"
                        options={instituteOptions}
                        value={inputs.instituteType}
                        onChange={selected => setInputs(p => ({ ...p, instituteType: selected }))}
                    />
                </div>

                <div className="mt-4">
                    <DateInput
                        label="Start date (DD-MM-YYYY)"
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

                    <button className="btn" onClick={onCancel} type="button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
