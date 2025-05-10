import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRange {
  gte: number;
  lte: number;
}

interface FilterState {
  priceGlobalRange: IRange;
  priceLocalRange: IRange;
  stockGlobalRange: IRange;
  stockLocalRange: IRange;
  ratingGlobalRange: IRange;
  ratingLocalRange: IRange;
  salesGlobalRange: IRange;
  salesLocalRange: IRange;
  isFilterOpen: boolean;
}

const initialState: FilterState = {
  priceGlobalRange: { gte: 0, lte: 0 },
  priceLocalRange: { gte: 0, lte: 0 },
  stockGlobalRange: { gte: 0, lte: 0 },
  stockLocalRange: { gte: 0, lte: 0 },
  ratingGlobalRange: { gte: 0, lte: 0 },
  ratingLocalRange: { gte: 0, lte: 0 },
  salesGlobalRange: { gte: 0, lte: 0 },
  salesLocalRange: { gte: 0, lte: 0 },
  isFilterOpen: false,
};

const filterSlice = createSlice({
  name: "productsFilter",
  initialState,
  reducers: {
    setPriceGlobalRange: (state, action: PayloadAction<IRange>) => {
      state.priceGlobalRange = action.payload;
    },
    setPriceLocalRange: (state, action: PayloadAction<IRange>) => {
      state.priceLocalRange = action.payload;
    },
    setStockGlobalRange: (state, action: PayloadAction<IRange>) => {
      state.stockGlobalRange = action.payload;
    },
    setStockLocalRange: (state, action: PayloadAction<IRange>) => {
      state.stockLocalRange = action.payload;
    },
    setRatingGlobalRange: (state, action: PayloadAction<IRange>) => {
      state.ratingGlobalRange = action.payload;
    },
    setRatingLocalRange: (state, action: PayloadAction<IRange>) => {
      state.ratingLocalRange = action.payload;
    },
    setSalesGlobalRange: (state, action: PayloadAction<IRange>) => {
      state.salesGlobalRange = action.payload;
    },
    setSalesLocalRange: (state, action: PayloadAction<IRange>) => {
      state.salesLocalRange = action.payload;
    },

    resetFilter: (state) => {
      state.priceLocalRange = state.priceGlobalRange;
      state.stockLocalRange = state.stockGlobalRange;
      state.ratingLocalRange = state.ratingGlobalRange;
      state.salesLocalRange = state.salesGlobalRange;
    },
    setIsFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload;
    },
  },
});

export const selectProductsFilter = (state: { productsFilter: FilterState }) =>
  state.productsFilter;
export const selectIsFilterOpen = (state: { productsFilter: FilterState }) =>
  state.productsFilter.isFilterOpen;
export const {
  setPriceGlobalRange,
  setPriceLocalRange,
  setStockGlobalRange,
  setStockLocalRange,
  setRatingGlobalRange,
  setRatingLocalRange,
  setSalesGlobalRange,
  setSalesLocalRange,
  resetFilter,
  setIsFilterOpen,
} = filterSlice.actions;
export default filterSlice.reducer;
