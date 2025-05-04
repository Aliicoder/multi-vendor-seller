import { IFilterState } from "@/components/conditionals/Filter";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

interface FilterContextType {
  filter: {} ;
  setFilter: Dispatch<SetStateAction<IFilterState>>;
}
export const FilterContext = createContext<FilterContextType>({
  filter: {},
  setFilter: () => {}, 
});
interface FilterProvider extends PropsWithChildren {}
function FilterProvider({children}:FilterProvider) {
  const [filter,setFilter] = useState<IFilterState>({});
  return (
    <FilterContext.Provider value={{filter,setFilter}}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider