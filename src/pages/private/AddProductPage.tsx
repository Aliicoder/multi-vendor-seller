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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useCallback, useRef, useState } from "react";
import { useAddProductMutation } from "@/store/apiSlices/productSlice";
import productValidation from "@/validations/productValidations";
import useSetTimeout from "@/hooks/useSetTimeout";
import useCategoriesPagination from "@/hooks/useCategoriesPagination";
import { cn, errorToast, successToast } from "@/lib/utils";
import formData from "@/lib/helpers/formData";
import CustomButton from "@/components/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { LuArrowUpRight } from "react-icons/lu";
import { ICategory } from "@/types/types";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import Return from "@/components/returns/Return";
import Loader from "@/components/Loaders/Loader";
function AddProductPage() {
  const [isShowFiles, setIsShowFiles] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filesUrls, setFilesUrls] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const navigate = useNavigate();
  const { categories } = useCategoriesPagination({
    name,
    level: 3,
    perPage: 5,
  });
  const { timeouter } = useSetTimeout();
  const [addProductMutation, { isLoading }] = useAddProductMutation();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);
  const addFilesInputRef = useRef<HTMLInputElement | null>(null);
  const addFileInputRef = useRef<HTMLInputElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const imgInfoRef = useRef<HTMLDivElement | null>(null);

  const form = useForm<z.infer<typeof productValidation>>({
    resolver: zodResolver(productValidation),
  });

  const handleSearchCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      timeouter(() => {
        if (name !== value) setName(value);
      }, 1000);
    },
    [name]
  );

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!categoriesRef.current?.contains(e.target as Node))
      setShowCategories(false);
  };

  const handleFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File[]) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      let newFiles = e.target.files;
      let urls = [];
      for (let file of newFiles) urls.push(URL.createObjectURL(file));
      fieldChange([...files, ...newFiles]);
      setFiles([...files, ...newFiles]);
      setFilesUrls([...filesUrls, ...urls]);
    }
  };

  const handleFileChange = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File[]) => void
  ) => {
    if (e.target.files && files && filesUrls) {
      let changedFile = e.target.files[0];
      let tempFiles = [...files];
      let tempFilesUrls = [...filesUrls];
      let changedFileUrl = URL.createObjectURL(changedFile);
      tempFiles[i] = changedFile;
      tempFilesUrls[i] = changedFileUrl;
      fieldChange([...tempFiles]);
      setFiles([...tempFiles]);
      setFilesUrls([...tempFilesUrls]);
    }
  };
  const handleFileRemove = (i: number) => {
    if (files && filesUrls) {
      const updatedFiles = files.filter((_, index) => index != i);
      const updatedFilesUrls = filesUrls.filter((_, index) => index != i);
      setFiles([...updatedFiles]);
      setFilesUrls([...updatedFilesUrls]);
      form.setValue("media", updatedFiles);
    }
  };

  const handleCategorySelection = (category: string) => {
    form.setValue("search", category);
    form.setValue("category", category);
    setShowCategories(false);
  };
  async function onSubmit(values: z.infer<typeof productValidation>) {
    try {
      const credentials = formData(values);
      const response = await addProductMutation({ credentials }).unwrap();
      successToast(response.message);
      form.reset();
    } catch (error: any) {
      errorToast(error.data.message);
    }
  }

  return (
    <>
      <div
        onClick={handleClose}
        className="p-5 relative flex flex-col h-full overflow-y-scroll"
      >
        {isLoading && <Loader />}
        <Return withUrl />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="p-10 m-auto gap-5 flex flex-col w-[650px] h-fit border rounded-lg border-neutral-100 bg-white "
          >
            <div className="flex justify-end items-center">
              <CustomButton
                className="gap-3 flex items-center font-semibold hover:underline"
                onClick={() => navigate("categories")}
              >
                categories List
                <LuArrowUpRight />
              </CustomButton>
            </div>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem ref={categoriesRef} className="relative w-full">
                  <FormControl ref={searchInputRef}>
                    <Input
                      {...field}
                      onFocus={() => setShowCategories(true)}
                      onChangeCapture={handleSearchCategoryChange}
                      placeholder="Search for category"
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormMessage />
                  {showCategories ? (
                    <div
                      ref={searchListRef}
                      className={cn(
                        `absolute z-20 left-0 mt-2 top-full p-2 gap-2 w-full flex flex-col border rounded-md bg-white montserrat `,
                        (categories == undefined || categories?.length == 0) &&
                          "hidden"
                      )}
                    >
                      {categories &&
                        categories.map((category: ICategory, i: number) => (
                          <div
                            key={i}
                            className=" py-1 px-2 rounded-md cursor-pointer hover:bg-slate-50"
                            onClick={() =>
                              handleCategorySelection(category.name)
                            }
                          >
                            {category?.name}
                          </div>
                        ))}
                    </div>
                  ) : null}
                </FormItem>
              )}
            />
            <div className={cn("relative gap-5 flex flex-col")}>
              <div
                className={cn(
                  "absolute z-10 left-0 top-0 inset-0 p-5 gap-3 flex flex-col border rounded-md overflow-y-scroll border-neutral-200",
                  !isShowFiles && "hidden"
                )}
              >
                {files.map((file, i) => {
                  return (
                    <div className=" basis-3/12 flex shrink-0 border rounded-lg overflow-hidden border-neutral-200">
                      <div className="flex justify-center items-center basis-3/12 shrink-0 ">
                        <img
                          className="w-full h-fit object-cover"
                          src={filesUrls[i]}
                          alt=""
                        />
                      </div>
                      <div ref={imgInfoRef} className="gap-1 p-2 flex flex-col">
                        <h1 className="text-fs-13 font-semibold line-clamp-1">
                          {file.name}
                        </h1>
                        <h1 className="text-fs-10 line-clamp-1">{file.type}</h1>
                        <h1 className="text-fs-13 line-clamp-1">{file.size}</h1>
                      </div>
                      <div className=" ml-auto gap-2 p-5 flex justify-center items-center ">
                        <MdDelete onClick={() => handleFileRemove(i)} />
                        <FormField
                          control={form.control}
                          name="media"
                          render={({ field }) => (
                            <FormItem className="hidden">
                              <FormControl>
                                <Input
                                  ref={addFileInputRef}
                                  onChange={(e) =>
                                    handleFileChange(i, e, field.onChange)
                                  }
                                  type="file"
                                  accept="image/*"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <AiFillEdit
                          onClick={() => addFileInputRef.current?.click()}
                        />
                        <GrFormView />
                      </div>
                    </div>
                  );
                })}
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className={cn(isShowFiles && "opacity-0")}>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
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
                name="description"
                render={({ field }) => (
                  <FormItem className={cn(isShowFiles && "opacity-0")}>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        onChangeCapture={() => form.clearErrors()}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={cn(isShowFiles && "opacity-0", "gap-5 flex")}>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
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
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={cn(isShowFiles && "opacity-0", "gap-5 flex")}>
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Brand {"(optional)"}</FormLabel>
                      <FormControl>
                        <Input
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
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Discount {"(optional)"}</FormLabel>
                      <FormControl>
                        <Input
                          onChangeCapture={() => form.clearErrors()}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div id="buttons" className="gap-3 mt-5 flex flex-col">
              <div className="relative gap-3 flex grow">
                <FormField
                  control={form.control}
                  name="media"
                  render={({ field }) => (
                    <FormItem className="w-full border rounded-md shadow-sm">
                      <FormControl>
                        <div className="relative flex">
                          <h1 className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            select files
                          </h1>
                          <CustomButton
                            type="button"
                            theme="white"
                            onClick={() => {
                              if (addFilesInputRef.current)
                                addFilesInputRef.current.click();
                            }}
                            className="relative w-full shadow-none border-0"
                          >
                            <Input
                              ref={addFilesInputRef}
                              className="hidden"
                              onChange={(e) =>
                                handleFilesChange(e, field.onChange)
                              }
                              multiple
                              type="file"
                              accept="image/*"
                            />
                          </CustomButton>
                          <CustomButton
                            className="shadow-none border-0"
                            theme="white"
                            type="button"
                            onClick={() => setIsShowFiles((prev) => !prev)}
                          >
                            {isShowFiles ? <VscEye /> : <VscEyeClosed />}
                          </CustomButton>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CustomButton
                type="submit"
                theme="black"
                className=" font-medium border rounded-lg"
              >
                submit
              </CustomButton>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default AddProductPage;
