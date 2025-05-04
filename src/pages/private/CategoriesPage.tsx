import Return from "@/components/returns/Return"
import { useFetchCategoriesQueryQuery as useFetchCategoriesQueryQuery } from "@/store/apiSlices/categorySlice"
import { BiEditAlt } from "react-icons/bi"
function CategoriesPage() {
  const { data: response } = useFetchCategoriesQueryQuery({})
  console.log(response)

  return (
    <>
      <div className=" p-6 flex flex-col">
        <Return className="mb-5" withUrl />
        <div className=" mb-6 flex justify-between font-bold text-blue-600">
          <h1 className="  ">categories list</h1>
        </div>

        <div className="columns-4 ">
          {response?.categories &&
            response?.categories.length > 0 &&
            response?.categories.map((category: any) => (
              <div key={category.name} className="">
                <div className="c4 m-3 p-3 flex items-center rounded-lg border border-slate-100 bg-white">
                  <div className="grow">{category.name}</div>
                </div>
                <div className="flex flex-col">
                  {category.children &&
                    category.children.length > 0 &&
                    category.children.map((category: any) => (
                      <>
                        <div className="c3 m-3 p-3 flex items-center font-semibold">
                          <div className="basis-2/12">
                            <img
                              className="p-2 pr-2"
                              src={category?.media?.url}
                              alt=""
                            />
                          </div>
                          <div className="grow">{category.name}</div>
                          <BiEditAlt />
                        </div>
                        {category.children &&
                          category.children.length > 0 &&
                          category.children.map((category: any) => (
                            <div className="c3 m-3 p-3 flex justify-between items-center">
                              {category.name}
                              <BiEditAlt />
                            </div>
                          ))}
                      </>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default CategoriesPage
