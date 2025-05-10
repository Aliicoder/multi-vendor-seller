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
import { useOnboardingMutation } from "@/store/apiSlices/authSlice";
import { errorToast, successToast } from "@/lib/utils";
import CustomButton from "@/components/buttons/CustomButton";
import onboardingValidation from "@/validations/onboardingValidation";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  updateCredentails,
} from "@/store/Reducers/authReducer";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OnboardingPage = () => {
  const user = useSelector(selectCurrentUser);
  if (user.boarded) {
    return <Navigate to={"/"} />;
  }

  const [onboardingMutation] = useOnboardingMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof onboardingValidation>>({
    resolver: zodResolver(onboardingValidation),
  });

  async function onSubmit(values: z.infer<typeof onboardingValidation>) {
    try {
      const response = await onboardingMutation(values).unwrap();
      dispatch(updateCredentails(response.user));
      successToast(response.message);
      navigate("/");
    } catch (error: any) {
      errorToast(error.data.message);
    }
  }
  useEffect(() => {
    form.setValue("userId", user.userId);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <Form {...form}>
        <form
          id="onboarding-form"
          className="flex flex-col bg-white border border-solid p-5 rounded-sm gap-3 w-[350px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold font-montserrat p-2 mb-4">
            | onboarding
          </h1>
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>

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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your business"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-center text-xs mt-4 text-red-500 line-clamp-2">
            By clicking Next, admin will review your business and you will be
            redirected to the dashboard
          </p>
          <CustomButton form="onboarding-form" theme="black" className="">
            Next
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingPage;
