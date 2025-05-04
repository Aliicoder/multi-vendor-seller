import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"
interface SidebarParams {
  className: string;
}
function Header({className}:SidebarParams) {
  const user = useSelector(selectCurrentUser) ;// console.log("user >>",user)
  const role = user?.roles[0] 
  useEffect(() =>{
  },[])
  return (
    <div className={className}>

      <div className='flex  justify-center items-center c6 montserrat  font-semibold  '>
        <h1> souq <span className='text-blue-600 '>.</span> </h1>
      </div>
      <div className='flex items-center ml-[3%] bg-slate-100 rounded-md'>

        <div className="c4 mx-[4%]">
          <CiSearch  className="m-1 cursor-pointer"/>
        </div>
        <motion.input 
          placeholder='Search'  
          className={`max-w-[300px]  py-2  c3  rounded-lg bg-slate-100 transition-all  outline-none`}
          type="text" />   
      </div>
      <div className='flex items-center px-5 gap-5'>
        <div className='flex flex-col text-right'>
          <h1 className='c2 font-medium' >{user?.name}</h1>
          <h1 className='c2' >{role == 1999 ?"admin":(role == 2000 ?"seller":"")}</h1>
        </div>
        <div className="max-w-8 border aspect-square  rounded-full  overflow-hidden">
          <img src={ user?.avatar != "" ? user?.avatar : "/images/download.png"} className='w-full object-contain' alt="" />
        </div>
        <div  className="flex justify-center items-center h-8 w-8 lg:hidden">
          <CiMenuFries />
        </div>
      </div>
    </div>
  )
}

export default Header