import { z } from "zod";

const ALLOWED_FILE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "video/mp4",
  "image/png",
];

const mediaObjectSchema = z.object({
  url: z.string(),
  publicId: z.string(),
  type: z.string(),
});

export default z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  search: z.string().min(0, {
    message: "Search term must be at least 2 characters if provided.",
  }),
  stock: z.string().min(1, {
    message: "Stock must be provided.",
  }),
  price: z.string().min(1, {
    message: "Price must be provided.",
  }),
  discount: z
    .string()
    .min(0, {
      message: "Discount cannot be negative.",
    })
    .default("0"),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  deletedMedia: z.array(z.string()),
  media: z.array(z.union([z.instanceof(File), mediaObjectSchema])).refine(
    (files) =>
      files.every((file) => {
        if (file instanceof File) {
          return ALLOWED_FILE_TYPES.includes(file.type);
        }
        return true;
      }),
    {
      message: "Only JPG, PNG, WEBP and MP4 files are allowed.",
    }
  ),
});
