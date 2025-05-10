import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRange {
  gte: number;
  lte: number;
}

interface FilterState {
  amountGlobalRange: IRange;
  amountLocalRange: IRange;
  currency: string;
  method: string;
  status: string;
  isFilterOpen: boolean;
}

const initialState: FilterState = {
  amountGlobalRange: { gte: 0, lte: 0 },
  amountLocalRange: { gte: 0, lte: 0 },
  currency: "",
  method: "",
  status: "",
  isFilterOpen: false,
};

const filterSlice = createSlice({
  name: "transactionsFilter",
  initialState,
  reducers: {
    setAmountGlobalRange: (state, action: PayloadAction<IRange>) => {
      state.amountGlobalRange = action.payload;
    },
    setAmountLocalRange: (state, action: PayloadAction<IRange>) => {
      state.amountLocalRange = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setMethod: (state, action: PayloadAction<string>) => {
      state.method = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    resetFilter: (state) => {
      state.amountLocalRange = state.amountGlobalRange;
      state.currency = "";
      state.method = "";
    },
    setIsFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload;
    },
  },
});

export const selectTransactionsFilter = (state: {
  transactionsFilter: FilterState;
}) => state.transactionsFilter;
export const selectIsFilterOpen = (state: {
  transactionsFilter: FilterState;
}) => state.transactionsFilter.isFilterOpen;
export const {
  setAmountGlobalRange,
  setAmountLocalRange,
  resetFilter,
  setIsFilterOpen,
  setCurrency,
  setMethod,
  setStatus,
} = filterSlice.actions;
export default filterSlice.reducer;
