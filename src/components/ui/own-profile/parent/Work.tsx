"use client";

import { useMemo, useState } from "react";
import WorkCard from "../child/WorkCard";
import UpdateWorkForm from "../child/UpdateWorkForm";
import AddWorkForm from "@/components/ui/own-profile/child/AddWorkForm";
import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import ErrorMessage from "../../error/ErrorMessage";

export default function Work() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editWorkId, setEditWorkId] = useState("");

    const { data, isLoading, error } = useGetMeQuery();

    const workExperience = data?.personalData?.workExperience;

    const sortedWorkExp = useMemo(() => {
        if (!workExperience) return [];

        const sorted = [...workExperience].sort((a, b) => {
            const aEnd = a.endDate ? new Date(a.endDate) : new Date();
            const bEnd = b.endDate ? new Date(b.endDate) : new Date();

            const diff = bEnd.getTime() - aEnd.getTime();

            if (diff !== 0) return diff;

            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });

        return sorted;
    }, [workExperience]);

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
                <h1 className="text-heading font-semibold">Work Experience</h1>

                <button
                    onClick={() => {
                        setShowAddForm(true);
                    }}
                    className="btn-icon absolute -top-1 right-0"
                >
                    Add
                </button>
            </div>
            {showAddForm && <AddWorkForm onCancel={() => setShowAddForm(false)} />}

            <ul className={`mt-6 ${sortedWorkExp.length === 0 && "hidden"} flex flex-col gap-4`}>
                {sortedWorkExp.map(work => (
                    <li key={work.id}>
                        {editWorkId !== work.id ? (
                            <WorkCard work={work} onClickEdit={id => setEditWorkId(id)} />
                        ) : (
                            <UpdateWorkForm work={work} onCancel={() => setEditWorkId("")} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
