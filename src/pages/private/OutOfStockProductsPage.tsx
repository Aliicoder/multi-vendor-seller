import { lazy, useCallback , useState } from "react";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";
import useSetTimeout from "@/hooks/useSetTimeout";
import useProductsPagination from "@/hooks/useProductsPagination";
import { MdFavoriteBorder } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { RiShareForwardLine } from "react-icons/ri";

const Pagination = lazy(()=> import("@/components/shared/Pagination"));

function OutOfStockProductsPage() {
  const [deleteProduct,setDeleteProduct] = useState(false)
  const [searchValue,setSearchValue] = useState("")
  const [perPage,setPerPage] = useState(8)
  const  { timeouter } = useSetTimeout()
  const [productToBeDelete,setProductToBeDelete] = useState({name:"",_id:""})
  const { products, counter , handleLeft , handleRight ,isLoading } = useProductsPagination(searchValue,perPage,true)
  const handlePerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) =>{
    setPerPage(parseInt(e.target.value))
  },[perPage])
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    timeouter( ()=>{
      if(searchValue !== value) 
        setSearchValue(value);
    },2000)
  },[searchValue])
  return (
    <div className="flex montserrat h-full flex-wrap  rounded-md">
      <div className="flex relative flex-col justify-between w-full  bg-slate-50">
        <ConditionalLoader condition={isLoading} />
        <div id="top-part">
          <div className="flex justify-between p-[2%] items-center bg-white">
            <h1 className="c8">Products</h1>

            <div className='flex relative overflow-hidden  gap-4  '>  
              <div className='flex items-center ml-[3%] bg-slate-100 rounded-md overflow-hidden'>
                <div className="c4 mx-[4%]">
                  <CiSearch  className="m-1 cursor-pointer"/>
                </div>
                <motion.input 
                  onChange={handleSearchChange}
                  placeholder='Search in orders'  
                  className={`max-w-[300px]  py-2  c3  rounded-lg bg-slate-100 transition-all  outline-none`}
                  type="text" />   
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center  bg-white  border-b p-[1%]">
            <div>

            </div>

            <div className="flex items-center gap-[10%] pr-[8%]">
              <select onChange={handlePerPageChange} className='c3 p-[1%]  rounded-md  ' name="" id="">
                <option value="5">8</option>
                <option value="10">16</option>
              </select>
              <h1 className="text-nowrap font-semibold c3">Per page</h1>
            </div>
          </div>
          <div className="flex flex-col montserrat">
            <div className="grid gap-4 grid-cols-2 p-6 md:grid-cols-4">
            {
              products && products.map((product:any) => 
                  (
                    <div key={product._id} className="group flex flex-col border shadow-sm rounded-md bg-white overflow-hidden -aspect-triangle hover:shadow-md">
                      <div className="relative flex basis-2/3 justify-center items-center overflow-hidden">
                        <img
                          className=" w-full h-full object-cover transition-all"
                          src={product?.media[0].url}
                          loading="lazy"
                        />
                        <div className="absolute left-1/2 -translate-x-1/2 translate-y-full top-full flex items-center gap-2 transition-all group-hover:top-1/2">
                          <div className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
                            <MdFavoriteBorder />
                          </div>
                          <div  className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
                            <LuShoppingCart />
                          </div>
                          <div className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
                            <RiShareForwardLine />
                          </div>
                        </div>
                      </div>
                      <div className="basis-1/3 flex flex-col gap-2 p-6 pt-3 shrink-0">
                        <h1 className="c3 py-3 font-semibold">{product.name}</h1>
                        <div className="flex justify-between gap-2">
                          <div className="flex justify-center items-center">
                            <h1 className="c3 text-center text hover:underline text-blue-500 cursor-pointer">show more</h1>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="cp-6 c3 font-semibold grow ">${product.price}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )
            }
            </div>
          </div>
        </div>
        <Pagination className="flex m-[2%]  justify-center text-black " counter={counter} onLeftClick={handleLeft} onRightClick={handleRight}/>
      </div>
    </div>
  )
}

export default OutOfStockProductsPage

        {/* <DeleteProduct condition={deleteProduct} product={productToBeDelete} onClick={handleClosePopUp}  /> */}

