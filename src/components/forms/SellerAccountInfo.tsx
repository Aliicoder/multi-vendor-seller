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
import { useEffect } from "react";
import accountInfoValidation from "@/validations/accountInfoValidation"
interface SellerAccountInfoParams {
  email:string
  status:string
  payment:string
  role:string
}
function SellerAccountInfo({email,status,payment,role}:SellerAccountInfoParams) { 
  const form = useForm<z.infer<typeof accountInfoValidation>>({resolver: zodResolver(accountInfoValidation),},)
  const placePlaceHolder = (value:string,placeholder:string)=>{
    if(value) return 
    return {placeholder}
  }
  useEffect(() =>{
    form.setValue("email", email)
    form.setValue("payment", payment)
    form.setValue("status", status)
    form.setValue("role", "standard")
  },[email])
  return (
    <div className=' p-[2%] border rounded-md bg-white'>
    <Form {...form}>
      <form  className={ `flex space-y-8  w-full cp-10`}>
        <div className={`flex cgap-6 items-center  flex-grow `}>
          <div className="flex flex-col gap-3 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled className={`border-0`}  {...placePlaceHolder(email,"Add your email")} {...field} />
                  </FormControl>
                  <FormDescription className="opacity-0">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input disabled className={`border-0`} {...placePlaceHolder(payment,"")} {...field} />
                  </FormControl>
                  <FormDescription className="opacity-0">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Payment</FormLabel>
                  <FormControl>
                    <Input disabled className={`border-0`} {...placePlaceHolder(payment,"")} {...field} />
                  </FormControl>
                  <FormDescription className="opacity-0">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Subscription</FormLabel>
                <FormControl>
                  <Input disabled className={`border-0`}  {...placePlaceHolder(role,"")} {...field} />
                </FormControl>
                <FormDescription className="opacity-0">
                  This is your public display name.
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

export default SellerAccountInfo







// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { useEffect, useState } from "react";
// import IconButton from "../buttons/IconButton"
// import { TbEditCircle } from "react-icons/tb"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
// import { useEditSellerAccountInfoMutation } from "@/store/Reducers/adminApiSlice";
// import toast from "react-hot-toast"
// import { useParams } from "react-router-dom"

// const formSchema = z.object({
//   email: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   payment: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   role: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   status: z
//   .string()
// })
// interface SellerAccountInfoParams {
//   email:string
//   status:string
//   payment:string
//   role:string
// }
// function SellerAccountInfo({email,status,payment,role}:SellerAccountInfoParams) { console.log(email,status,payment,role)
//   const {sellerId} = useParams() ;console.log("sellerId >> ",sellerId)
//   const [editForm,setEditForm] = useState(false)
//   //const [ editAccountInfoMutation ,{isLoading}] = useEditSellerAccountInfoMutation()
//   const form = useForm<z.infer<typeof formSchema>>({resolver: zodResolver(formSchema),},)
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     // try {
//     //   values.sellerId = sellerId;
//     //   const response = await editAccountInfoMutation(values).unwrap()
//     //   toast.success(response.message)
//     //   setEditForm(false)
//     // } catch (error:any) {
//     //   toast.error(error?.data?.message ?? "try again later")
//     // }
//   }
//   const handleEdit = () =>{
//     setEditForm(!editForm)
//   }
//   useEffect(() =>{
//     form.setValue("email", email)
//     form.setValue("payment", payment)
//     form.setValue("status", status)
//     form.setValue("role", role)
//   },[email])
//   const placePlaceHolder = (value:string,placeholder:string)=>{
//     if(value) return 
//     return {placeholder}
//   }
//   return (
//     <div className=' p-[2%] border rounded-md bg-white'>
//       <div className="flex flex-row-reverse items-start">
//         {
//           editForm ?
//           <div className="flex cgap-6" >
//               <IconButton  text="Save changes" direction={"left"}>
//               </IconButton>
//             <IconButton className=" border text-black bg-white hover:bg-white" onClick={handleEdit} text="Cancel" direction={"left"}>
//             </IconButton>
//           </div>
//           :
//           <IconButton className=" border text-black bg-white hover:bg-white" text="Edit" onClick={handleEdit} direction={"left"}>
//             <TbEditCircle />
//           </IconButton>       
//         }
//     </div>
//     <Form {...form}>
//       <form  onSubmit={form.handleSubmit(onSubmit)} className={ `flex space-y-8  w-full cp-10`}>
//         <div className={`flex cgap-6 items-center  flex-grow ${editForm ? "":"pointer-events-none opacity-75"}`}>
//           <div className="flex flex-col gap-3 w-full">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem className="">
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input disabled className={`border-0`}  {...placePlaceHolder(email,"Add your email")} {...field} />
//                   </FormControl>
//                   <FormDescription className="opacity-0">
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem >
//                     <FormLabel>Status</FormLabel>
//                     <Select  onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl className="w-1/2">
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="active">active</SelectItem>
//                         <SelectItem value="inactive">inactive</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormDescription>
//                     once your account confirmed you can start selling
//                   </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//           </div>
//           <div className="flex flex-col gap-3 w-full">
//             <FormField
//               control={form.control}
//               name="payment"
//               render={({ field }) => (
//                 <FormItem className="">
//                   <FormLabel>Payment</FormLabel>
//                   <FormControl>
//                     <Input disabled className={`border-0`} {...placePlaceHolder(payment,"")} {...field} />
//                   </FormControl>
//                   <FormDescription className="opacity-0">
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//             control={form.control}
//             name="role"
//             render={({ field }) => (
//               <FormItem className="">
//                 <FormLabel>Role</FormLabel>
//                 <FormControl>
//                   <Input disabled className={`border-0`}  {...placePlaceHolder(role,"")} {...field} />
//                 </FormControl>
//                 <FormDescription className="opacity-0">
//                   This is your public display name.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           </div>
//         </div>

//       </form>
//     </Form>
//     </div>
//   )
// }

// export default SellerAccountInfo