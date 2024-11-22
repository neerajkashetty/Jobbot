import * as z from "zod";

export const PersonalInfoSchema = z.object({
  firstname: z.string().nonempty("First name is required."),
  lastname: z.string().nonempty("Last name is required."),
  phone: z.string().regex(/^\d+$/, "Phone must be numeric."),
  linkedin: z.string().url("Invalid LinkedIn URL."),
  location: z.string().nonempty("Location is required."),
  github: z.string().url("Invalid GitHub URL."),
  education: z
    .array(
      z.object({
        degree: z.string().nonempty("Degree is required."),
        university: z.string().nonempty("University is required."),
        cgpa: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid CGPA."),
      })
    )
    .min(1, "At least one education record is required."),
  jobTitle: z.string().nonempty("Job title is required."),
  period: z.string().nonempty("Period is required."),
  company: z.string().nonempty("Company is required."),
  description: z.string().nonempty("Description is required."),
});

export type PersonalInfoSchemaType = z.infer<typeof PersonalInfoSchema>;
