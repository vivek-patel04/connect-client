"use client";

import { useState } from "react";
import SkillCard from "../child/SkillCard";
import UpdateSkillForm from "../child/UpdateSkillForm";
import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import AddSkillForm from "@/components/ui/own-profile/child/AddSkillForm";
import ErrorMessage from "../../error/ErrorMessage";

export default function Skills() {
    const [editSkillId, setEditSkillId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const { data, isLoading, error } = useGetMeQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5">
                <div className="loading-card-white">
                    <div className="loading-line-small"></div>
                    <div className="loading-line-mid mt-3"></div>
                </div>
            </div>
        );
    }

    if (error) {
        console.log(error);
        return <ErrorMessage />;
    }

    const skills = data?.personalData?.skills || [];

    return (
        <div className="backdrop-white-1">
            <div className=" flex justify-between items-start relative">
                <h1 className="text-heading font-semibold">Professional Skills</h1>

                <button
                    onClick={() => {
                        setShowAddForm(true);
                    }}
                    className="btn-icon absolute -top-1 right-0"
                >
                    Add
                </button>
            </div>

            {showAddForm && <AddSkillForm onCancel={() => setShowAddForm(false)} />}

            <ul className={`mt-6 ${skills.length === 0 && "hidden"} flex flex-col gap-4`}>
                {skills.map(skill => (
                    <li key={skill.id}>
                        {editSkillId !== skill.id ? (
                            <SkillCard skill={skill} onClickEdit={id => setEditSkillId(id)} />
                        ) : (
                            <UpdateSkillForm skill={skill} onCancel={() => setEditSkillId("")} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
