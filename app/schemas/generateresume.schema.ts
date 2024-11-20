import { z } from "zod";

export const GenerateResumeSchema = z.object({
  JobTitle: z.string().min(1, "Job Title Required"),
  JobDescription: z
    .string()
    .min(20, "The Description should be atleaset 20 characters")
    .max(300, "It should not be more than 300 characters"),
});

export type GenerateResumeSchema = z.infer<typeof GenerateResumeSchema>;
