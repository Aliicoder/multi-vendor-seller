import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import React, { useCallback, useRef, useState } from "react"
import { useEditProductMutation } from "@/store/apiSlices/productSlice"
import { GrCloudUpload } from "react-icons/gr"
import productUpdateValidation from "@/validations/productUpdateValidation"
import useCategoriesPagination from "@/hooks/useCategoriesPagination"
import useSetTimeout from "@/hooks/useSetTimeout"
import { useLocation } from "react-router-dom"
import FilesPreviewerCarousel from "@/components/Carousels/FilesPreviewerCarousel"
import LinkButton from "@/components/buttons/LinkButton"
import { IoArrowBackOutline } from "react-icons/io5"
import { IProduct } from "@/types/types"
import useEditProductFileHandler from "@/hooks/useEditProductFileHandler"
import FlexCol from "@/components/styled/FlexCol"
import Flex from "@/components/styled/Flex"
import FlexRow from "@/components/styled/FlexRow"
import FlexForm from "@/components/styled/FlexForm"
import formData from "@/lib/helpers/formData"
import { errorToast, successToast } from "@/lib/utils"
import CustomButton from "@/components/buttons/CustomButton"

function EditProduct() {
  const product = useLocation().state?.product as IProduct
  const [name, setName] = useState("")
  const { categories } = useCategoriesPagination({ name, level: 3, perPage: 5 })
  const { timeouter } = useSetTimeout()
  const categoriesRef = useRef<HTMLDivElement | null>(null)
  const [showCategories, setShowCategories] = useState(false)

  const form = useForm<z.infer<typeof productUpdateValidation>>({
    resolver: zodResolver(productUpdateValidation),
  })
  const {
    filesUrls,
    previewMedia,
    handleFileChange,
    handleFileRemove,
    handleFilesInsertion,
    setPreviewMedia,
  } = useEditProductFileHandler({ form, product })
  const [editProductMutation] = useEditProductMutation()

  const handleSearchCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      timeouter(() => {
        if (name !== value) setName(value)
      }, 1000)
    },
    [name]
  )

  const handleSetCategory = (e: any) => {
    form.setValue("category", e.target.textContent)
    form.setValue("search", e.target.textContent)
    setShowCategories(false)
  }

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!categoriesRef.current?.contains(e.target as Node))
      setShowCategories(false)
  }

  async function onSubmit(values: z.infer<typeof productUpdateValidation>) {
    try {
      const credentials = formData(values)
      const response = await editProductMutation({
        productId: product._id,
        credentials,
      }).unwrap()
      successToast(response)
    } catch (error) {
      errorToast(error)
    }
  }
  return (
    <>
      <LinkButton
        className="montserrat sticky top-0 font-semibold gap-[1%] bg-transparent text-slate-700 shadow-none p-[2%]"
        text="Back"
        direction={"left"}
        to={"/products/inStock"}
      >
        <IoArrowBackOutline />
      </LinkButton>

      <FlexCol
        onClick={handleClose}
        className=" pb-6 w-full| justify-center items-center "
      >
        <Form {...form}>
          <FlexForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="z-10 space-y-8 gap-3 w-[70%] p-[3%] mx-auto | border rounded-md bg-white  "
          >
            <FlexCol className="p-6 pb-0 space-y-8  | justify-between ">
              <FlexCol className="gap-6 | justify-between ">
                <Flex className="aspect-square w-full | overflow-hidden  justify-center items-center ">
                  <img
                    className="object-contain h-full"
                    src={previewMedia.url}
                    alt=""
                  />
                </Flex>

                <FilesPreviewerCarousel
                  filesUrls={filesUrls}
                  previewMedia={previewMedia}
                  setPreviewMedia={setPreviewMedia}
                />

                <FlexRow className=" gap-6 | w-full justify-center">
                  <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="">
                          <Input
                            className="file"
                            onChange={(event) =>
                              handleFilesInsertion(event, field.onChange)
                            }
                            multiple
                            type="file"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="">
                          <Input
                            className="file"
                            onChange={(event) =>
                              handleFileChange(event, field.onChange)
                            }
                            type="file"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CustomButton
                    type="button"
                    onClick={handleFileRemove}
                    className=""
                  >
                    Delete
                  </CustomButton>
                </FlexRow>
              </FlexCol>

              <FlexCol className="gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          readOnly
                          autoComplete="false"
                          placeholder=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem
                      ref={categoriesRef}
                      className="w-full relative cp-6 rounded-md"
                    >
                      <FormLabel className="">Product Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onFocus={() => setShowCategories(true)}
                          onChangeCapture={handleSearchCategoryChange}
                          autoComplete="false"
                          placeholder="search your category"
                        />
                      </FormControl>
                      <FormMessage />
                      {showCategories ? (
                        <div
                          className={`
                          ${
                            categories?.length == 0 || categories == undefined
                              ? "hidden"
                              : ""
                          } 
                          absolute flex p-2 fo flex-col gap-1 montserrat border  rounded-md  
                          cp-6 bg-white w-full left-0  `}
                        >
                          {categories &&
                            categories.map((category: any) => (
                              <div
                                key={category?.name}
                                className="hover:bg-slate-50 rounded-md cursor-pointer"
                                onClick={handleSetCategory}
                              >
                                {category.name}
                              </div>
                            ))}
                        </div>
                      ) : null}
                    </FormItem>
                  )}
                />
              </FlexCol>
            </FlexCol>

            <FlexCol>
              <FlexCol className="px-10 gap-6 | rounded-md ">
                <h1 className=" font-medium ">General Information</h1>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          onChangeCapture={() => form.clearErrors()}
                          placeholder="~Nike V2K"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Make sure name not duplicate
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          onChangeCapture={() => form.clearErrors()}
                          placeholder="~Nike new edition running shoes"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter brief description</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FlexCol>

              <FlexCol className=" px-10 gap-6">
                <h1 className="font-medium  py-3">Pricing and Stock</h1>

                <FlexRow className="gap-6">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="~Nike"
                            onChangeCapture={() => form.clearErrors()}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            onChangeCapture={() => form.clearErrors()}
                            placeholder="~1000"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FlexRow>

                <FlexRow className="gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            onChangeCapture={() => form.clearErrors()}
                            placeholder="~100$"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Discount {"(optional)"}</FormLabel>
                        <FormControl>
                          <Input
                            onChangeCapture={() => form.clearErrors()}
                            placeholder="~10%"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FlexRow>
              </FlexCol>
            </FlexCol>

            <Flex className="px-10 justify-center ">
              <CustomButton type="submit">
                Save changes
                <GrCloudUpload />
              </CustomButton>
            </Flex>
          </FlexForm>
        </Form>
      </FlexCol>
    </>
  )
}

export default EditProduct
