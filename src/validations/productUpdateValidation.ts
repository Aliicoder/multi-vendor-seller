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
  brand: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
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
  deletedMedia: z.array(z.string()),
  media: z
    .array(z.union([z.instanceof(File), z.string()]))
    .refine(
      (files) =>
        files.every(
          (file) =>
            typeof file == "string" || ALLOWED_FILE_TYPES.includes(file.type)
        ),
      {
        message: "Only JPG and MP4 files are allowed.",
      }
    ),
})
