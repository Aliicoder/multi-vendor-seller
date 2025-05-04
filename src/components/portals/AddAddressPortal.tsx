import ReactDOM from "react-dom";
import AddAddressForm from "../forms/AddAddressForm";
import { MdClose } from "react-icons/md";
interface IAddAddressPortal {
  addAddress:boolean
  setAddAddress:React.Dispatch<React.SetStateAction<boolean>>
}
function AddAddressPortal({addAddress,setAddAddress}:IAddAddressPortal) {

  const portalElement = document.getElementById("portals");
  if (!portalElement) {
    return null; 
  }

  return ReactDOM.createPortal(
   <>
      {
        addAddress &&
        <div className="p-6 top-1/2 left-1/2 | absolute z-50 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg">
          <div>
            <div onClick={()=>setAddAddress(false)} className=" flex justify-end">
              <MdClose className="c9 m-4 scale-150 md:c5 md:scale-100" />
            </div>
            <AddAddressForm />
          </div>
        </div>
       
      }
   </>
    ,
    portalElement
  );
}

export default AddAddressPortal;
