import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaGoogle } from "react-icons/fa";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginValidation from "@/validations/loginValidation";
import { useLoginMutation } from "@/store/apiSlices/authSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/Reducers/authReducer";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import Flex from "../styled/Flex";
import toast from "react-hot-toast";
import CustomButton from "../buttons/CustomButton";
import { errorToast } from "@/lib/utils";

const LogInForm = () => {
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const from = location?.state?.from?.pathname || "/";
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
  });
  const handleShowInput = (status: boolean) => {
    status == true ? setShowInput(true) : setShowInput(false);
  };
  async function onSubmit(values: z.infer<typeof loginValidation>) {
    try {
      const response = await loginMutation(values).unwrap();
      console.log("response ", response);
      dispatch(setCredentials(response.user));
      navigate(from, { state: { from: location.pathname } });
    } catch (error: any) {
      errorToast(error.data.message);
    }
  }
  return (
    <Flex
      className="w-full h-lvh justify-center items-center bg-slate-50  
        md:w-1/2"
    >
      <Form {...form}>
        <form
          className="relative space-8 gap-3 flex flex-col w-[300px] border border-solid  p-5 rounded-sm bg-white"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Email"
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
                        className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
                      />
                    ) : (
                      <VscEyeClosed
                        onClick={() => handleShowInput(true)}
                        className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                    <Input
                      type={showInput ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="on"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Forgot your password ?{" "}
                  <span className="underline cursor-pointer">
                    change password
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="gap-3 my-6 flex flex-col ">
            <CustomButton
              theme="black"
              {...(isLoading == true ? dispatch : null)}
            >
              Login
            </CustomButton>
            <CustomButton
              theme="white"
              className="gap-3 flex justify-center items-center"
            >
              via Google
              <FaGoogle className="text-red-500" />
            </CustomButton>
          </div>
          <h1 className="pb-3 c2 mulish font-semibold text-center">
            don`t you have account ?{" "}
            <Link className="text-blue-400 underline" to="/signup">
              Sign Up
            </Link>{" "}
          </h1>
        </form>
      </Form>
    </Flex>
  );
};

export default LogInForm;
