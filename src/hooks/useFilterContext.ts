import { FilterContext } from "@/Context/FilterProductsContext";
import { useContext } from "react";

export function useFilterContext () {
  return useContext(FilterContext)
}