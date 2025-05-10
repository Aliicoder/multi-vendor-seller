import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AmountRange {
  gte: number;
  lte: number;
}

interface FilterState {
  amountGlobalRange: AmountRange;
  amountLocalRange: AmountRange;
  quantityGlobalRange: AmountRange;
  quantityLocalRange: AmountRange;
  deliveryStatus: string;
  isFilterOpen: boolean;
}

const initialState: FilterState = {
  amountGlobalRange: { gte: 0, lte: 0 },
  amountLocalRange: { gte: 0, lte: 0 },
  quantityGlobalRange: { gte: 0, lte: 0 },
  quantityLocalRange: { gte: 0, lte: 0 },
  deliveryStatus: "",
  isFilterOpen: false,
};

const filterSlice = createSlice({
  name: "ordersFilter",
  initialState,
  reducers: {
    setAmountGlobalRange: (state, action: PayloadAction<AmountRange>) => {
      state.amountGlobalRange = action.payload;
    },
    setAmountLocalRange: (state, action: PayloadAction<AmountRange>) => {
      state.amountLocalRange = action.payload;
    },
    setQuantityGlobalRange: (state, action: PayloadAction<AmountRange>) => {
      state.quantityGlobalRange = action.payload;
    },
    setQuantityLocalRange: (state, action: PayloadAction<AmountRange>) => {
      state.quantityLocalRange = action.payload;
    },
    setDeliveryStatus: (state, action: PayloadAction<string>) => {
      state.deliveryStatus = action.payload;
    },
    resetFilter: (state) => {
      state.amountLocalRange = state.amountGlobalRange;
      state.quantityLocalRange = state.quantityGlobalRange;
      state.deliveryStatus = "";
    },
    setIsFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload;
    },
  },
});

export const selectOrdersFilter = (state: { ordersFilter: FilterState }) =>
  state.ordersFilter;
export const selectIsFilterOpen = (state: { ordersFilter: FilterState }) =>
  state.ordersFilter.isFilterOpen;
export const {
  setAmountGlobalRange,
  setAmountLocalRange,
  setQuantityGlobalRange,
  setQuantityLocalRange,
  setDeliveryStatus,
  resetFilter,
  setIsFilterOpen,
} = filterSlice.actions;
export default filterSlice.reducer;
