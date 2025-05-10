import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import signupValidation from "@/validations/signupValidation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { errorToast, successToast } from "@/lib/utils";
import CustomButton from "../buttons/CustomButton";
import { GoogleSignInButton } from "../buttons/GoogleSignIn";
import {
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
} from "@/store/apiSlices/authSlice";
import otpValidation from "@/validations/otpValidation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const SignupForm = () => {
  const navigate = useNavigate();
  const [sendEmailOtpMutation] = useSendEmailOtpMutation();
  const [verifyEmailOtpMutation] = useVerifyEmailOtpMutation();

  const [verifyOtp, setVerifyOtp] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const userForm = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
  });

  const otpForm = useForm<z.infer<typeof otpValidation>>({
    resolver: zodResolver(otpValidation),
  });

  async function onSubmitUser(values: z.infer<typeof signupValidation>) {
    try {
      const response = await sendEmailOtpMutation({
        email: values.email,
      }).unwrap();
      setVerifyOtp(true);
      successToast(response.message);
    } catch (error: any) {
      errorToast(error.data.message);
    }
  }
  async function onSubmitOtp(values: z.infer<typeof otpValidation>) {
    try {
      const response = await verifyEmailOtpMutation({
        otp: values.otp,
        email: userForm.getValues("email"),
        name: userForm.getValues("name"),
        password: userForm.getValues("password"),
        requestedRole: "seller",
      }).unwrap();
      successToast(response.message);
      navigate("/login");
    } catch (error: any) {
      errorToast(error.data.message);
    }
  }
  return (
    <>
      {verifyOtp && (
        <Form {...otpForm}>
          <form
            id="otp-form"
            className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            flex items-center justify-center  w-full h-full bg-black/30"
            onSubmit={otpForm.handleSubmit(onSubmitOtp)}
          >
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem
                  className="flex flex-col items-center justify-center 
                place-items-center w-[400px] h-[350px] bg-white
                border border-solid rounded-md"
                >
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="p-5">
                    Please enter OTP sent to your phone{" "}
                    <button
                      type="button"
                      onClick={() => otpForm.handleSubmit(onSubmitOtp)()}
                      className="text-blue-500 ml-2 hover:underline"
                    >
                      Resend OTP
                    </button>
                  </FormDescription>
                  <div className="flex gap-5">
                    <CustomButton
                      onClick={() => setVerifyOtp(false)}
                      type="button"
                      theme="blue-outline"
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton form="otp-form" type="submit" theme="blue">
                      Verify & Submit
                    </CustomButton>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
      <div
        className="flex justify-center items-center w-full h-lvh bg-blue-500 
      md:w-1/2"
      >
        <Form {...userForm}>
          <form
            id="user-form"
            className="flex flex-col bg-white border border-solid p-5 rounded-sm gap-3"
            onSubmit={userForm.handleSubmit(onSubmitUser)}
          >
            <FormField
              control={userForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="on"
                      placeholder=""
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="on"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={userForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {showInput ? (
                        <VscEye
                          onClick={() => setShowInput(false)}
                          className="-translate-x-1/2 -translate-y-1/2 absolute right-2 top-1/2"
                        />
                      ) : (
                        <VscEyeClosed
                          onClick={() => setShowInput(true)}
                          className="-translate-x-1/2 -translate-y-1/2 absolute right-2 top-1/2"
                        />
                      )}
                      <Input
                        type={showInput ? "text" : "password"}
                        autoComplete="on"
                        placeholder=""
                        required
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userForm.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex gap-2 py-2 items-center">
                  <FormControl>
                    <Checkbox
                      className=""
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor="terms" className="p-0 !mt-0  text-fs-13">
                    I agree to the privacy policy and term
                  </Label>
                </FormItem>
              )}
            />
            <div className="flex flex-col w-full gap-2 ">
              <CustomButton form="user-form" theme="black" className="">
                Signup
              </CustomButton>
              <GoogleSignInButton />
            </div>

            <h1 className="text-center text-fs-13 font-semibold mulish">
              Already Sign up ?{" "}
              <Link className="text-blue-400 underline" to="/login">
                Sign in
              </Link>{" "}
            </h1>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SignupForm;
