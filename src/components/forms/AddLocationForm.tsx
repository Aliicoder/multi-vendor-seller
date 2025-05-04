import { Button } from "@/components/ui/button"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { setCredentials } from "@/store/Reducers/authReducer"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { z } from "zod"
import {useAddLocationMutation} from "@/store/Reducers/authApiSlice"
const formSchema = z.object({
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  area: z.string().min(2, {
    message: "area must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  pinCode: z.string().min(2, {
    message: "pinCode must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "type must be at least 2 characters.",
  }),
  province: z.string().min(2, {
    message: "province must be at least 2 characters.",
  }),
})
interface AddLocationForm {
  setIsAddLocation: Dispatch<SetStateAction<boolean>>
}
function AddLocationForm({setIsAddLocation}:AddLocationForm) {
  const dispatch = useDispatch()
  const [addLocationMutation] = useAddLocationMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  })
  async function  onSubmit(values: z.infer<typeof formSchema>) {
    try { console.log("values >>",values)
      const response = await addLocationMutation(values).unwrap()
      dispatch(setCredentials(response.user))
      toast.success(response.message)
      setIsAddLocation(false)
    } catch (error:any) {  console.error(error)
      toast.error(error?.data?.message ?? "try again later")
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white border p-6 rounded-md">
    <div className="flex bg-slate-50 p-6 rounded-md gap-3">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel >Type</FormLabel>
              <Select  onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border">
                  <SelectTrigger>
                    <SelectValue className="border" placeholder="Location Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-3">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Area</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-3">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pinCode"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Pin Code</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    
      <div className="flex gap-3">
        <Button type="submit">Save</Button>
        <Button onClick={()=>setIsAddLocation(false)}>Cancel</Button>
      </div>
    </form>
  </Form>
  )
}

export default AddLocationForm