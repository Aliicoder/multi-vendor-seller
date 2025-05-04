import useSetTimeout from "@/hooks/useSetTimeout";
import { useCallback } from "react";
import { CiSearch } from "react-icons/ci"
interface Searchbar {
  searchValue: string
  setSearchValue:  React.Dispatch<React.SetStateAction<string>>
}
function Searchbar({searchValue,setSearchValue}:Searchbar) {
  const  { timeouter } = useSetTimeout()
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    timeouter( ()=>{
      if(searchValue !== value) 
        setSearchValue(value);
    },2000)
  },[searchValue])
  return (
    <div className='flex relative overflow-hidden  gap-4  '>  
    <div className='flex items-center ml-[3%] bg-slate-100 rounded-md overflow-hidden'>
      <div className="c4 mx-[4%]">
        <CiSearch  className="m-1 cursor-pointer"/>
      </div>
      <input 
        onChange={handleSearchChange}
        placeholder='Search in orders'  
        className={`max-w-[300px]  py-2  c3  rounded-lg bg-slate-100 transition-all  outline-none`}
        type="text" />   
    </div>
  </div>
  )
}

export default Searchbar