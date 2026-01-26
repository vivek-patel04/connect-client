import { SkillType } from "@/types/user/types";
import { useState } from "react";
import TextInput from "../../common/TextInput";
import TextArea from "../../common/TextArea";
import { useUpdateSkillMutation } from "@/hooks/api/user/useUpdateSkillMutation";
import { skillInputValidation } from "@/input-validation/user/inputValidators";

interface PropsType {
    skill: SkillType;
    onCancel: () => void;
}

export default function UpdateSkillForm({ skill, onCancel }: PropsType) {
    const [inputs, setInputs] = useState({
        skillName: skill.skillName,
        description: skill.description,
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { mutateAsync, isPending } = useUpdateSkillMutation();

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) return;

        const { success, data, error } = skillInputValidation(inputs);

        if (!success) {
            setErrorMessage(error.issues[0].message);
            return;
        }
        try {
            await mutateAsync({ body: data, skillID: skill.id });
            onCancel();
        } catch (error) {}
    };
    return (
        <div className="max-w-[420px] w-full">
            <h2 className="text-heading font-semibold"> Update Skill</h2>
            <form className="mt-4" onSubmit={handleOnSubmit}>
                <div>
                    <TextInput label="Skill" value={inputs.skillName} onChange={e => setInputs(p => ({ ...p, skillName: e.target.value }))} maxLength={50} />
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
