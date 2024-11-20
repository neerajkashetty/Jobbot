import { z } from "zod";

export const GenerateResumeSchema = z.object({
  jobtitle: z.string().min(1, "Job Title Required"),
  jobdescription: z
    .string()
    .min(1, "The Description should be atleaset 20 characters"),
});

export type GenerateResumeSchema = z.infer<typeof GenerateResumeSchema>;
