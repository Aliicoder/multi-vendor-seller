import { z } from "zod";

export default z.object({
  otp: z
    .string()
    .length(6, {
      message: "OTP must be exactly 6 digits.",
    })
    .regex(/^\d+$/, {
      message: "OTP must contain only numbers.",
    }),
});
