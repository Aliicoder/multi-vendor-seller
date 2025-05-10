import { apiSlice } from "@/store/api/apiSlice";
import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import transactionsFilter from "./Reducers/Filters/productsFilter";
import ordersFilter from "./Reducers/Filters/ordersFilter";
import productsFilter from "./Reducers/Filters/productsFilter";
const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  category: categoryReducer,
  transactionsFilter: transactionsFilter,
  ordersFilter: ordersFilter,
  productsFilter: productsFilter,
};
export default rootReducer;
