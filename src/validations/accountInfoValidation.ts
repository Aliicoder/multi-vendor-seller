import { z } from "zod";

export default z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  payment: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  status: z
  .string()
})