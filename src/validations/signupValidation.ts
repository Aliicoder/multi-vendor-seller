import { z } from "zod"

export default z.object({
  name: z.string().min(2, {
    message: "name is too short",
  }),
  email: z.string().email().min(2, {
    message: "invalid email",
  }),
  password: z.string().min(8, {
    message: "password is too short",
  }),
  description: z
    .string()
    .min(10, {
      message: "description is too short",
    })
    .max(100, { message: "description is too long" }),
  requestedRole: z.string().default("seller"),
  terms: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
})

// .superRefine((data, ctx) => {
//   if (data.password !== data.confirmPassword) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Passwords do not match",
//       path: ["confirmPassword"], // Indicate the error on confirmPassword field
//     });
//   }
// });
