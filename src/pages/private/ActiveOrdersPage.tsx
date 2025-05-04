import { lazy, useCallback, useEffect, useRef, useState } from "react";
import LinkButton from "@/components/buttons/LinkButton";
import { MdAddToPhotos } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { GrView } from "react-icons/gr";
import { TbEditCircle } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import useOrdersPagination from "@/hooks/useOrdersPagination";
import useSetTimeout from "@/hooks/useSetTimeout";
import useSegment from "@/hooks/useSegment";
import IconButton from "@/components/buttons/IconButton";
import { Link } from "react-router-dom";
import OrdersNavBar from "@/components/shared/OrdersNavBar";
const ConditionalLoader = lazy(()=> import("@/components/conditionals/ConditionalLoader"));
const Pagination = lazy(()=> import("@/components/shared/Pagination"));

function ActiveOrdersPage() {
  const [deleteProduct,setDeleteProduct] = useState(false)
  const [searchValue,setSearchValue] = useState("")
  const [perPage,setPerPage] = useState(5)
  const  { timeouter } = useSetTimeout()
  const [productToBeDelete,setProductToBeDelete] = useState({name:"",_id:""})
  const { orders, counter , handleLeft , handleRight ,isLoading } = useOrdersPagination(searchValue,perPage,status="active")
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
          <div className="flex justify-between p-[2%] bg-white items-center">
            <h1 className="c8">Orders</h1>

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

          <div className="flex justify-between items-center  bg-white  p-[1%] border-b">
           <div></div>

            <div className="flex items-center gap-[10%] pr-[8%]">
              <select onChange={handlePerPageChange} className='c3 p-[1%]  rounded-md  ' name="" id="">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <h1 className="text-nowrap font-semibold c3">Per page</h1>
            </div>
          </div>

          <div className='flex flex-col px-[1%] '>
            <div id="table" className="">
              <div className="grid grid-cols-6  my-[3%] justify-items-center c2">
                <div>Order id</div> <div>Quantity</div> <div>Price</div> <div>Address</div> <div>Confirmation</div> <div>Actions</div>
              </div>
              {
                orders&&orders.length > 0 ?
                orders.map((order:any)=>(
                  <div 
                    key={order._id} className="grid grid-cols-6 py-[2%] odd:bg-transparent  bg-white rounded-md justify-items-center c3 ">
                    <div className="text-ellipsis overflow-hidden">{order?._id}</div>
                    <div>{order?.cluster?.clusterNoOfProducts}</div> 
                    <div>{order?.cluster?.clusterPrice}</div> 
                    <div>{order?.address?.city}</div> 
                    <div>
                      <IconButton text="Confirm" direction={"right"}>
                      </IconButton>  
                    </div> 
                    <div className="group relative flex justify-center items-center ">
                      <FaChevronDown />
                      <ul className={` group-hover:block hidden
                        c3 font-normal montserrat absolute bottom-0 translate-y-full w-fit p-[10%] bg-white border rounded-md`}>
                        <li className="  cursor-pointer">
                          <LinkButton text="View" to={""} direction={"right"}>
                            <GrView />
                          </LinkButton>
                        </li>
                        <li className=" cursor-pointer">
                          <LinkButton text="Edit" to={"editProduct"} direction={"right"}>
                            <TbEditCircle />
                          </LinkButton>
                        </li>
                        <li className=" cursor-pointer">
                          <LinkButton text="Delete" to={""} direction={"right"}>
                            <AiTwotoneDelete />
                          </LinkButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
                :
                <div></div>
              }
            </div>
          </div>
        </div>

        <Pagination counter={counter} onLeftClick={handleLeft} onRightClick={handleRight}/>
      </div>
    </div>
  )
}

export default ActiveOrdersPage

        {/* <DeleteProduct condition={deleteProduct} product={productToBeDelete} onClick={handleClosePopUp}  /> */}

