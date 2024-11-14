import { z } from "zod";

export const PersonalInfoSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  phone: z.string().regex(/^\d+$/, "Phone must be a valid number"),
  linkedin: z.string().url("LinkedIn must be a valid URL"),
  github: z.string().url("GitHub must be a valid URL"),
  location: z.string().min(1, "Location is required"),
  degree: z.string().min(1, "Degree is required"),
  university: z.string().min(1, "University is required"),
  cgpa: z
    .number()
    .min(0, "CGPA cannot be less than 0")
    .max(10, "CGPA cannot be more than 10"),
  jobTitle: z.string().optional(),
  period: z.string().regex(/^\d+$/, "Period must be a valid number").optional(),
  company: z.string().optional(),
  description: z.string().optional(),
});

export type PersonalInfoSchemaType = z.infer<typeof PersonalInfoSchema>;
