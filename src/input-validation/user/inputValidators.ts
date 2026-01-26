import { z } from "zod";

const descriptionSchema = z
    .union([z.string({ message: "Invalid data type" }).trim().max(750, { message: "Description must be 750 characters or fewer" }), z.null()])
    .optional();

const dateSchema = z
    .string({ message: "Invalid date" })
    .trim()
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, { message: "Date must be in YYYY-MM-DD format" })
    .refine(
        input => {
            const [year, month, date] = input.split("-").map(str => Number(str));

            if (!year || !month || !date) return false;

            const d = new Date(year, month - 1, date);

            return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === date;
        },
        { message: "Invalid date" }
    );

const dateSchemaOptional = z
    .union([
        z
            .string({ message: "Invalid date" })
            .trim()
            .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, { message: "Date must be in YYYY-MM-DD format" })
            .refine(
                input => {
                    if (!input) return true;
                    const [year, month, date] = input.split("-").map(str => Number(str));

                    if (!year || !month || !date) return false;

                    const d = new Date(year, month - 1, date);

                    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === date;
                },
                { message: "Invalid date" }
            ),
        z.null(),
    ])

    .optional();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const workExpInputValidation = (inputs: any) => {
    const schema = z
        .object({
            organization: z
                .string({ message: "Invalid data type" })
                .trim()
                .min(1, { message: "Organization name can not be empty" })
                .max(50, { message: "Organization name must be 50 characters or fewer" }),
            role: z
                .string({ message: "Invalid data type" })
                .trim()
                .min(1, { message: "Role can not be empty" })
                .max(50, { message: "Role must be 50 characters or fewer" }),
            location: z
                .string({ message: "Invalid data type" })
                .trim()
                .min(1, { message: "Location can not be empty" })
                .max(50, { message: "Location must be 50 characters or fewer" }),
            description: descriptionSchema,
            startDate: dateSchema,
            endDate: dateSchemaOptional,
        })
        .refine(
            data => {
                if (data.endDate && data.startDate) {
                    return data.endDate > data.startDate;
                }
                return true;
            },
            {
                message: "End date can not be smaller than start date",
                path: ["endDate"],
            }
        );

    const result = schema.safeParse(inputs);

    return result;
};

export const educationInputValidation = (inputs: any) => {
    const schema = z
        .object({
            institute: z
                .string({ message: "Invalid data type" })
                .trim()
                .min(1, { message: "Institute name can not be empty" })
                .max(50, { message: "Institute name must be 50 characters or fewer" }),
            instituteType: z.enum(["school", "highSchool", "university", "bootcamp", "other"], {
                message: "Institute type can be only school, highSchool, university, bootcamp and other",
            }),
            description: descriptionSchema,
            startDate: dateSchema,
            endDate: dateSchemaOptional,
        })
        .refine(
            data => {
                if (data.endDate && data.startDate) {
                    return data.endDate > data.startDate;
                }
                return true;
            },
            {
                message: "End date can not be smaller than start date",
                path: ["endDate"],
            }
        );

    const result = schema.safeParse(inputs);

    return result;
};

export const skillInputValidation = (inputs: any) => {
    const schema = z.object({
        skillName: z
            .string({ message: "Skill name can not be empty" })
            .trim()
            .min(1, { message: "Skill name can not be empty" })
            .max(50, { message: "Skill name must be 50 characters or fewer" }),
        description: descriptionSchema,
    });

    const result = schema.safeParse(inputs);

    return result;
};

export const awardInputValidation = (inputs: any) => {
    const schema = z.object({
        title: z
            .string({ message: "Title can not be empty" })
            .trim()
            .min(1, { message: "Title can not be empty" })
            .max(50, { message: "Title must be 50 characters or fewer" }),

        description: descriptionSchema,
    });

    const result = schema.safeParse(inputs);

    return result;
};

export const profilePhotoInputValidation = (inputs: any) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

    const profilePhotoSchema = z.object({
        file: z
            .instanceof(File)
            .refine(file => file.size <= MAX_FILE_SIZE, {
                message: "File size must be less than 2MB",
            })
            .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
                message: "Only JPG and PNG images are allowed",
            }),
    });

    const result = profilePhotoSchema.safeParse(inputs);

    return result;
};
