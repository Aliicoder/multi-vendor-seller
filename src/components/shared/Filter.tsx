import { useReducer } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import IconButton from "../buttons/IconButton";
import { useFilterContext } from "@/hooks/useFilterContext";
import { useFetchSellerCategoriesQuery } from "@/store/apiSlices/categorySlice";
import { productRating } from "@/utils/helpers/rating";
export interface IFilterState {
  minPrice?: number
  maxPrice?: number 
  avgRating?: number 
  category?: string 
}
type IFilterAction =
  | { type: "SET_PRICE_RANGE"; payload: { name: string; value: number | undefined } }
  | { type: "SET_RATING"; payload: number }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "RESET_FILTERS" };
const initialState   = {
  minPrice: undefined ,
  maxPrice: undefined ,
  avgRating: undefined,
  category: undefined,
} as IFilterState
function filterReducer(state:IFilterState, action:IFilterAction) :IFilterState {
  switch (action.type) {
    case "SET_PRICE_RANGE":
      const { name, value } = action.payload;
      if (value) {
        if (name === "minPrice") return { ...state, [name] : value } 
        if (name === "maxPrice") return { ...state, [name] : value } 
      } else {
        return { ...state, [name]: undefined };
      }
      return state
    case "SET_RATING":
      return { ...state, avgRating : state.avgRating === action.payload ? undefined : action.payload }
    case "SET_CATEGORY":
      return {...state, category: state.category === action.payload ? undefined : action.payload }
    case "RESET_FILTERS":
      return initialState;
    default:
      throw new Error(`Unhandled action type`);
  }
}

function Filter() {
  const {data:response} = useFetchSellerCategoriesQuery({})
  const {setFilter} = useFilterContext()
  const [state, dispatch] = useReducer(filterReducer, initialState)
  const handleRangeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name)
    console.log(event.target.value)
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: { name: event.target.name, value: +(event.target.value) },
    });
  };
  const handleFilterSubmit = (e:React.FormEvent) =>{
    e.preventDefault()
    setFilter(state)
  }
  return (
    <>
       <form onSubmit={handleFilterSubmit} action="" className='flex flex-col justify-between z-10 h-full'>
        <div className="">
          <h1 className="font-semibold">Categories</h1>
          <ul className="pl-3 py-3">
            {
              response?.sellerCategories&&response?.sellerCategories.map((categoryName:string) => (
                <li className="flex justify-between py-1">
                  <label
                    htmlFor="terms"
                    className="pl-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {categoryName}
                  </label>
                  <Checkbox 
                    onClick={()=> dispatch({type:"SET_CATEGORY",payload:categoryName})}
                    checked={categoryName == state.category}   value={categoryName} id="terms" />     
                </li>
              ))
            }
          </ul>
        </div>

        <div>
          <h1 className="font-semibold">Price range</h1>
          <div className="flex gap-3 p-4">
            <Input onChange={handleRangeChange} name="minPrice" type="text" placeholder="min" />
            <div className="flex justify-center items-center">to</div>
            <Input onChange={handleRangeChange} name="maxPrice" type="text" placeholder="max" />
          </div>
        </div>

        <div>
          <h1 className="font-semibold">Rating</h1>
          <div className="flex gap-3 pl-3 py-3">
            <ul className="flex flex-col-reverse w-full gap-1" >
              { 
                Array.from({length: 6}).map((_,index) => 
                <li className="flex justify-between  ">
                    <label
                      htmlFor="terms"
                      className="pl-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    <span className="flex"> {productRating(index)} </span>
                    </label>
                    <Checkbox 
                      onClick={()=> dispatch({type:"SET_RATING",payload:index})}  value={index} id="terms" />   
                </li>
                )             
              }
            </ul>
          </div>
        </div>

        <div className="flex justify-evenly pt-3">
          <IconButton onClick={()=>dispatch({type:"RESET_FILTERS"})} className=" font-semibold  " 
            text="Clear" direction={"right"}>
          </IconButton>
          <IconButton type="submit"  className="font-semibold bg-blue-500 hover:bg-blue-400 text-white hover:text-white" 
            text="Apply" direction={"right"}>
          </IconButton>
        </div>
      </form>
    </>
  )
}

export default Filter