import { z } from "zod";


export default z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  image: z.any()
    .refine((file)=>  file instanceof File  , {
      message: "Only JPG files are allowed.",
    }), 
});

  //if (typeof file === "string") return true; // Assuming URLs (strings) are always valid
