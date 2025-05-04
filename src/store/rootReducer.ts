import { apiSlice } from "@/store/api/apiSlice"
import authReducer from "./Reducers/authReducer"
import  categoryReducer  from "./Reducers/categoryReducer"
const rootReducer = {
  [apiSlice.reducerPath]:apiSlice.reducer,
  auth:authReducer,
  category:categoryReducer,
}
export default rootReducer