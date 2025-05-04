import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AiTwotoneDelete } from "react-icons/ai"
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
import { useRef } from "react"
import { useDeleteProductMutation } from "@/store/apiSlices/productSlice"
import { IProduct } from "@/types/types"
import { errorToast, successToast } from "@/lib/utils"
import CustomButton from "../buttons/CustomButton"
interface DeleteProductParams {
  productToBeDeleted: IProduct | undefined
  setProductToBeDeleted: React.Dispatch<
    React.SetStateAction<IProduct | undefined>
  >
}
function DeleteProductForm({
  productToBeDeleted,
  setProductToBeDeleted,
}: DeleteProductParams) {
  const formRef = useRef<HTMLFormElement>(null)
  const [deleteProductMutation, { isLoading }] = useDeleteProductMutation()
  const formSchema = z.object({
    productName: z.enum([`${productToBeDeleted?.name}`], {
      message: `Delete Name is ${productToBeDeleted?.name}`,
    }),
  })

  const portalElement = document.getElementById("portals")
  if (!portalElement) {
    return null
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleClickOutSideTheForm = (event: React.MouseEvent) => {
    if (!formRef.current?.contains(event.target as Node)) {
      setProductToBeDeleted(undefined)
    }
  }
  async function onSubmit() {
    if (productToBeDeleted) {
      try {
        const response = await deleteProductMutation({
          productId: productToBeDeleted._id,
        }).unwrap()
        setProductToBeDeleted(undefined)
        successToast(response)
      } catch (error) {
        errorToast(error)
      }
    }
  }
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        onClick={handleClickOutSideTheForm}
        className="p-4 w-[300px] gap-4 | flex flex-col "
      >
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Product name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                type{" "}
                <span className="font-bold">{productToBeDeleted?.name}</span> to
                confirm
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex cp-6 justify-end  ">
          <CustomButton
            disabled={isLoading ? true : false}
            className="bg-red-500"
          >
            Delete
            <AiTwotoneDelete />
          </CustomButton>
        </div>
      </form>
    </Form>
  )
}

export default DeleteProductForm
