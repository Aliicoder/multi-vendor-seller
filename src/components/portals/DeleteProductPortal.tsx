import { MdClose } from "react-icons/md";
import DeleteProductForm from "../forms/DeleteProductForm";
import { IProduct } from "@/types/types";
import Fixed from "../styled/Fixed";
interface IDeleteProductPortal {
  productToBeDeleted:IProduct | undefined
  setProductToBeDeleted:React.Dispatch<React.SetStateAction<IProduct | undefined>>
}
function DeleteProductPortal({productToBeDeleted,setProductToBeDeleted}:IDeleteProductPortal) {

  return (
    <>
      {
        productToBeDeleted &&
        <Fixed className="p-6 top-1/2 left-1/2 | absolute z-50 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg">
          <div>
            <div onClick={()=>setProductToBeDeleted(undefined)} className=" flex justify-end">
              <MdClose className="c9 m-4 scale-150 md:c5 md:scale-100" />
            </div>
            <DeleteProductForm productToBeDeleted={productToBeDeleted} setProductToBeDeleted={setProductToBeDeleted}  />
          </div>
        </Fixed>
      }
    </>
  )
 
  
}

export default DeleteProductPortal;
