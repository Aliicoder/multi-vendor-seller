import { MdAttachMoney } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
import { forwardRef } from "react"
import { FixedSizeList as List } from "react-window"
function handleOnWheel({deltaY}){
  console.log("handleOnWhell",deltaY)
}
const outerElementType = forwardRef((props,ref)=>{
  return <div ref={ref} onWheel={handleOnWheel} {...props}/>
})

function PaymentsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  const Rows = ({index,style}) =>{
    return (
      <div style={style} className="c3 flex even:bg-slate-100">
        <div className="w-1/4 text-center cp-5">{index+1}</div>
        <div className="w-1/4 text-center cp-5 truncate ">300$</div>
        <div className="w-1/4 text-center cp-5 truncate">Pending</div>
        <div className="w-1/4 text-center cp-5 truncate">13 Jun 2024</div>
      </div>
    )
  }
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  }
  return (
    <div className="w-full h-full bg-slate-50">
      <div className="grid montserrat gap-2 cp-3_10 grid-cols-2 mt-3 md:grid-cols-2 lg:grid-cols-4 ">
        <div className="flex justify-around overflow-hidden cp-3_10 bg-teal-300 rounded-md    " >
          <div>
            <h1 className="c6">3045$</h1>
            <h3 className="c3">Total Sales</h3>
          </div>
          <div className="c3 flex justify-center items-center scale-150 ">
            <div className="flex justify-center items-center cp-10 border border-slate-50 rounded-full ">
              <MdAttachMoney />
            </div>
          </div>
        </div>
        <div className="flex justify-around overflow-hidden cp-3_10 bg-orange-300 rounded-md    " >
          <div>
            <h1 className="c6">2498$</h1>
            <h3 className="c3">Available amount</h3>
          </div>
          <div className="c3 flex justify-center items-center scale-150 "> 
            <div className="flex justify-center items-center cp-10 border border-slate-50 rounded-full ">
              <MdAttachMoney />
            </div>
          </div>
        </div>
        <div className="flex justify-around overflow-hidden cp-3_10 bg-slate-400 rounded-md    " >
          <div>
            <h1 className="c6">603$</h1>
            <h3 className="c3">WithDraw Amount</h3>
          </div>
          <div className="c3 flex justify-center items-center scale-150 ">
            <div className="flex justify-center items-center cp-10 border border-slate-50 rounded-full ">
              <MdAttachMoney />
            </div>  
          </div>
        </div>
        <div className="flex justify-around overflow-hidden cp-3_10 bg-cyan-400 rounded-md    " >
          <div>
            <h1 className="c6">456$</h1>
            <h3 className="c3">Pending Amount</h3>
          </div>
          <div className="c3 flex justify-center items-center scale-150 ">
            <div className="flex justify-center items-center cp-10 border border-slate-50 rounded-full ">
              <MdAttachMoney />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full gap-3 cp-3_10">
        <div className="flex flex-col w-1/2 gap-3 bg-white rounded-md cp-3_10">
          <Form  {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3 px-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Send request</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your amount" {...field} />
                    </FormControl>
                    <FormDescription>
                      You should enter amount in your range
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <div>
            <div className="flex">
              <div className="w-1/4 font-semibold c3 text-center cp-10">No</div>
              <div className="w-1/4 font-semibold c3 text-center cp-10">Amount</div>
              <div className="w-1/4 font-semibold c3 text-center cp-10">Status</div>
              <div className="w-1/4 font-semibold c3 text-center cp-10">Date</div>
            </div>
            {
              <List 
              className="List"
              style={{width: '100%'}}
              height={500}  
              itemSize={33}
              itemCount={10}
              outerElementType={outerElementType}
              >
                {Rows}
              </List>
            }
          </div>
        </div>
        <div className="w-1/2 gap-2 bg-white rounded-sm cp-3_10">
        <div>
            <div className="flex">
              <div className="w-1/4 font-semibold c3 text-center cp-10">No</div>
              <div className="w-1/4 font-semibold c3 text-center cp-10">Amount</div>
              <div className="w-1/4 font-semibold c3 text-center cp-10">Status</div>
              <div className="w-1/4 font-semibold c3 text-center cp-10">Date</div>
            </div>
            {
              <List 
              className="List"
              style={{width: '100%'}}
              height={500}  
              itemSize={33}
              itemCount={10}
              outerElementType={outerElementType}
              >
                {Rows}
              </List>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsPage