import { z } from "zod"
const ALLOWED_FILE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "video/mp4",
  "image/png",
]
export default z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  brand: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .optional(),
  category: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  search: z.string().min(0, {
    message: "Username must be at least 2 characters.",
  }),
  stock: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  price: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  discount: z
    .string()
    .min(0, {
      message: "Username must be at least 2 characters.",
    })
    .default("0"),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  media: z
    .array(z.instanceof(File))
    .refine(
      (files) => files.every((file) => ALLOWED_FILE_TYPES.includes(file.type)),
      { message: "File format not supported" }
    ),
})
