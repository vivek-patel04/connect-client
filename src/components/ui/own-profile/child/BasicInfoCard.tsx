import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";

function BasicInfoCard() {
    const { data } = useGetMeQuery();

    if (!data) return null;

    const { dob, gender, hometown, languages, interests } = data.personalData;

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(dob || 0));

    return (
        <div className="backdrop-blue-1">
            <table>
                <tbody>
                    {gender && (
                        <tr>
                            <td className="text-small text-white-50 py-[2px]">Gender</td>

                            <td className="py-[2px] text-small">&nbsp;&nbsp;:&nbsp;&nbsp;{gender === "male" ? "Male" : "Female"}</td>
                        </tr>
                    )}

                    {dob && (
                        <tr>
                            <td className="text-small text-white-50 py-[2px]">Date of birth</td>

                            <td className="py-[2px] text-small">&nbsp;&nbsp;:&nbsp;&nbsp;{formattedDate}</td>
                        </tr>
                    )}

                    {hometown && (
                        <tr>
                            <td className="text-small text-white-50 py-[2px]">Hometown</td>

                            <td className="py-[2px] text-small">&nbsp;&nbsp;:&nbsp;&nbsp;{hometown} </td>
                        </tr>
                    )}

                    {languages.length > 0 && (
                        <tr>
                            <td className="text-small text-white-50 py-[2px]">Languages</td>

                            <td className="py-[2px] text-small">
                                &nbsp;&nbsp;:&nbsp;&nbsp;
                                {languages.map((language: string, index: number) => (
                                    <span key={index}>{index === 0 ? language : `, ${language}`}</span>
                                ))}
                            </td>
                        </tr>
                    )}

                    {interests.length > 0 && (
                        <tr>
                            <td className="text-small text-white-50 py-[2px]">Interests</td>

                            <td className="py-[2px] text-small">
                                &nbsp;&nbsp;:&nbsp;&nbsp;
                                {interests.map((intrest: string, index: number) => (
                                    <span key={index}>{index === 0 ? intrest : `, ${intrest}`}</span>
                                ))}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BasicInfoCard;
