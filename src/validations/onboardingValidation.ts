import { z } from "zod";

export default z.object({
  userId: z.string(),
  businessName: z.string().min(5, "Name must be at least 5 characters long"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters long"),
});
