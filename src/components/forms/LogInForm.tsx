import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginValidation from "@/validations/loginValidation";
import { useLoginMutation } from "@/store/apiSlices/authSlice";
import { useDispatch } from "react-redux";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import CustomButton from "../buttons/CustomButton";
import { GoogleSignInButton } from "../buttons/GoogleSignIn";
import { errorToast, successToast } from "@/lib/utils";
import { setCredentials } from "@/store/Reducers/authReducer";
const LogInForm = () => {
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const from = location?.state?.from || "/";
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
  });
  const handleShowInput = (status: boolean) => {
    if (status == true) return setShowInput(true);
    setShowInput(false);
  };
  async function onSubmit(values: z.infer<typeof loginValidation>) {
    try {
      const response = await login(values).unwrap();
      successToast(response.message);
      dispatch(setCredentials(response.user));
      navigate(from);
    } catch (error: any) {
      errorToast(error.data.message);
    }
  }
  return (
    <div
      className=" w-full flex justify-center items-center h-lvh bg-blue-500  
    md:w-1/2 "
    >
      <Form {...form}>
        <form
          className="flex flex-col bg-white border border-solid p-5 rounded-sm gap-5 relative space-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {showInput ? (
                        <VscEye
                          onClick={() => handleShowInput(false)}
                          className="-translate-x-1/2 -translate-y-1/2 absolute right-2 top-1/2"
                        />
                      ) : (
                        <VscEyeClosed
                          onClick={() => handleShowInput(true)}
                          className="-translate-x-1/2 -translate-y-1/2 absolute right-2 top-1/2"
                        />
                      )}
                      <Input
                        type={showInput ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Forgot your password ?{" "}
                    <span className="cursor-pointer underline">
                      change password
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <CustomButton
              {...(isLoading == true ? dispatch : null)}
              theme="black"
            >
              Login{" "}
            </CustomButton>
            <GoogleSignInButton />
          </div>

          <div className="text-center text-fs-13 font-semibold mulish">
            do you have account ?{" "}
            <Link className="text-blue-400 underline" to="/signup">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LogInForm;
