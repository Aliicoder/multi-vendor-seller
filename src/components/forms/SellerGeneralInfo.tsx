import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChangeEvent, useEffect, useState } from "react"
import { TbEditCircle } from "react-icons/tb"
import toast from "react-hot-toast"
import generalInfoValidation from "@/validations/generalInfoValidation"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/store/Reducers/authReducer"
import { useEditGeneralInfoMutation } from "@/store/apiSlices/authSlice"
import CustomButton from "../buttons/CustomButton"

interface SellerGeneralInfoFormParams {
  name: string
  image: string
}
function SellerGeneralInfoForm({ name, image }: SellerGeneralInfoFormParams) {
  console.log(image)
  const [editForm, setEditForm] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const user = useSelector(selectCurrentUser)
  console.log(user)
  const [editGeneralInfoMutation] = useEditGeneralInfoMutation()
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      fieldChange(e.target.files[0])
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }
  const form = useForm<z.infer<typeof generalInfoValidation>>({
    resolver: zodResolver(generalInfoValidation),
  })
  const handleEdit = () => {
    setEditForm(!editForm)
  }
  const placePlaceHolder = (value: string, placeholder: string) => {
    if (value) return
    return { placeholder }
  }
  useEffect(() => {
    form.setValue("name", name)
    setAvatarUrl(image)
  }, [name])

  async function onSubmit(values: z.infer<typeof generalInfoValidation>) {
    try {
      const response = await editGeneralInfoMutation(values).unwrap()
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error?.data?.message ?? "try again later")
    }
  }
  return (
    <div className=" p-[2%] border rounded-md  bg-white">
      <div className="flex flex-row-reverse items-start">
        {editForm ? (
          <div className="flex items-center ">
            <CustomButton form="generalInfo" type="submit">
              Save changes
            </CustomButton>

            <CustomButton
              className="ml-6 border text-black bg-white hover:bg-white"
              onClick={handleEdit}
            >
              Cancel
            </CustomButton>
          </div>
        ) : (
          <CustomButton
            className=" border text-black bg-white hover:bg-white"
            onClick={handleEdit}
          >
            Edit
            <TbEditCircle />
          </CustomButton>
        )}
      </div>
      <Form {...form}>
        <form
          id="generalInfo"
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex space-y-8  w-full cp-10`}
        >
          <div
            className={`flex gap-[6%] items-center  flex-grow ${
              editForm ? "" : "pointer-events-none opacity-75"
            }`}
          >
            <div className="flex  justify-center items-center ">
              <div className="cw-200 border rounded-full overflow-hidden aspect-square  bg-white">
                <img className="w-full  " src={avatarUrl || "/fb.jpg"} alt="" />
              </div>
            </div>

            <div className="flex flex-col  basis-9/12 shrink-0 gap-y-3 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Seller name</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className={`border-0`}
                        {...placePlaceHolder(name, "")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Update profile image</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) => handleFileChange(e, field.onChange)}
                        type="file"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SellerGeneralInfoForm
