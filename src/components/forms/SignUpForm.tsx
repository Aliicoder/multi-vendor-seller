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
import { Link, useLocation, useNavigate } from "react-router-dom";
import signupValidation from "@/validations/signupValidation";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { Label } from "@radix-ui/react-label";
import { setCredentials } from "@/store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useSignupMutation } from "@/store/apiSlices/authSlice";
import { Textarea } from "../ui/textarea";
import CustomButton from "../buttons/CustomButton";
import { errorToast, successToast } from "@/lib/utils";
interface ISignUpForm {
  className?: string;
}
const SignUpForm = ({ className }: ISignUpForm) => {
  const [signup, { isLoading }] = useSignupMutation();
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/login";
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
  });
  const handleShowInput = (status: boolean) => {
    if (status == true) return setShowInput(true);
    setShowInput(false);
  };
  async function onSubmit(values: z.infer<typeof signupValidation>) {
    try {
      const response = await signup(values).unwrap();
      dispatch(setCredentials(response.user));
      successToast(response.message);
      navigate(from);
    } catch (error: any) {
      errorToast(error?.data?.message);
    }
  }
  return (
    <div className={className}>
      <Form {...form}>
        <form
          className="relative space-8 gap-3 flex flex-col w-[300px]  border border-solid  p-5 rounded-sm bg-white"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business name</FormLabel>
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
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" autoComplete="on" required {...field} />
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
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="brief about the business"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex gap-3 cp-6 items-center ">
                <FormControl>
                  <Checkbox
                    className=""
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label
                  htmlFor="terms"
                  className="p-0 !mt-0 flex items-center text-fs-10 montserrat "
                >
                  I agree to the privacy policy and term
                </Label>
              </FormItem>
            )}
          />
          <CustomButton
            theme="black"
            className="my-6 w-full"
            {...(isLoading == true ? dispatch : null)}
          >
            Sign up
          </CustomButton>
          <h1 className="pb-3 c2 mulish font-semibold text-center">
            Already Sign up ?{" "}
            <Link className="underline text-blue-400" to="/login">
              Sign in
            </Link>{" "}
          </h1>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
