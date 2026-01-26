"use client";

import { useMemo, useState } from "react";
import EducationCard from "../child/EducationCard";
import UpdateEducationForm from "../child/UpdateEducationForm";
import AddEducationForm from "../child/AddEducationForm";
import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import ErrorMessage from "../../error/ErrorMessage";

export default function Education() {
    const [editEducationId, setEditEducationId] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const { data, isLoading, error } = useGetMeQuery();

    const educations = data?.personalData?.education;

    const sortedEducation = useMemo(() => {
        if (!educations) return [];

        const sorted = [...educations].sort((a, b) => {
            const aEnd = a.endDate ? new Date(a.endDate) : new Date();
            const bEnd = b.endDate ? new Date(b.endDate) : new Date();

            const diff = bEnd.getTime() - aEnd.getTime();

            if (diff !== 0) return diff;

            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });

        return sorted;
    }, [educations]);

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

    return (
        <div className="backdrop-white-1">
            <div className=" flex justify-between items-start relative">
                <h1 className="text-heading font-semibold">Education</h1>

                <button
                    onClick={() => {
                        setShowAddForm(true);
                    }}
                    className="btn-icon absolute -top-1 right-0"
                >
                    Add
                </button>
            </div>

            {showAddForm && <AddEducationForm onCancel={() => setShowAddForm(false)} />}

            <ul className={`mt-6 ${sortedEducation.length === 0 && "hidden"} flex flex-col gap-4`}>
                {sortedEducation.map(edu => (
                    <li key={edu.id}>
                        {editEducationId !== edu.id ? (
                            <EducationCard education={edu} onClickEdit={id => setEditEducationId(id)} />
                        ) : (
                            <UpdateEducationForm education={edu} onCancel={() => setEditEducationId("")} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
