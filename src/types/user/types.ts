export interface EducationType {
    id: string;
    institute: string;
    instituteType: string;
    description: string | null;
    startDate: string;
    endDate: string | null;
    personalDataID: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface WorkExperienceType {
    id: string;
    organization: string;
    role: string;
    location: string;
    description: string | null;
    startDate: string;
    endDate: string | null;
    personalDataID: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AwardType {
    id: string;
    title: string;
    description: string | null;
    personalDataID: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SkillType {
    id: string;
    skillName: string;
    description: string | null;
    personalDataID: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PersonalDataType {
    id: string;
    dob: string | null;
    gender: string | null;
    cloudinaryPublicID: string;
    profilePictureURL: string;
    thumbnailURL: string;
    hometown: string | null;
    languages: string[];
    interests: string[];
    userID: string;
    education: EducationType[];
    workExperience: WorkExperienceType[];
    awards: AwardType[];
    skills: SkillType[];
}

export interface UserProfileType {
    id: string;
    name: string;
    email: string;
    personalData: PersonalDataType;
}

export interface UserMiniType {
    id: string;
    name: string;
    thumbnailURL: string;
}

export interface RelationType {
    relation: "self" | "no relation" | "connection" | "request sent" | "request received";
}

export interface CursorType {
    createdAt: string;
    id: string;
}

export interface ConnectionsType {
    users: UserMiniType[];
    nextCursor: CursorType;
}

export interface ConnectionsAtoZType {
    users: UserMiniType[];
    nextCursor: {
        name: string;
        id: string;
    };
}
