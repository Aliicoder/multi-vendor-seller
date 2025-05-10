import ReactSlider from "react-slider";
import { useSelector } from "react-redux";
import {
  setIsFilterOpen,
  resetFilter,
  setStockLocalRange,
  setRatingLocalRange,
  setPriceLocalRange,
  setSalesLocalRange,
} from "@/store/Reducers/Filters/productsFilter";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { selectProductsFilter } from "@/store/Reducers/Filters/productsFilter";

function ProductsFilter() {
  const {
    priceGlobalRange,
    stockGlobalRange,
    ratingGlobalRange,
    salesGlobalRange,
    priceLocalRange,
    stockLocalRange,
    ratingLocalRange,
    salesLocalRange,
  } = useSelector(selectProductsFilter);
  const [priceRange, setPriceRange] = useState({
    gte: priceLocalRange?.gte,
    lte: priceLocalRange?.lte,
  });
  const [stockRange, setStockRange] = useState({
    gte: stockLocalRange?.gte,
    lte: stockLocalRange?.lte,
  });
  const [ratingRange, setRatingRange] = useState({
    gte: ratingLocalRange?.gte,
    lte: ratingLocalRange?.lte,
  });
  const [salesRange, setSalesRange] = useState({
    gte: salesLocalRange?.gte,
    lte: salesLocalRange?.lte,
  });

  const dispatch = useDispatch();

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setPriceLocalRange(priceRange));
    dispatch(setStockLocalRange(stockRange));
    dispatch(setRatingLocalRange(ratingRange));
    dispatch(setSalesLocalRange(salesRange));
    dispatch(setIsFilterOpen(false));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(resetFilter());
    dispatch(setIsFilterOpen(false));
  };

  return (
    <form
      onSubmit={handleFilterSubmit}
      className="flex flex-col items-center justify-center gap-2 z-10 h-full w-full"
    >
      <div
        className="flex flex-col items-center justify-between gap-2 w-[300px] 
       bg-white border border-neutral-200 rounded-lg shadow-sm p-4"
      >
        <div className="flex justify-between items-center w-full">
          <h1 className="font-semibold"></h1>
          <button onClick={() => dispatch(setIsFilterOpen(false))}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div id="price">
            <h1 className="font-semibold">price</h1>
            <div className="flex justify-between gap-4 p-5 items-center ">
              <span>{priceRange?.gte}</span>

              <ReactSlider
                className="react-slider"
                thumbClassName="react-slider__thumb"
                trackClassName="react-slider__track"
                renderThumb={(props) => <div {...props} />}
                renderTrack={(props, state) => (
                  <div
                    {...props}
                    className={`react-slider__track ${
                      state.index === 1 ? "react-slider__track-1" : ""
                    }`}
                  />
                )}
                min={priceGlobalRange?.gte}
                value={[priceRange?.gte, priceRange?.lte]}
                onChange={(value) =>
                  setPriceRange({
                    gte: Number(value[0]),
                    lte: Number(value[1]),
                  })
                }
                max={priceGlobalRange?.lte}
              />
              <span>{priceRange?.lte}</span>
            </div>
          </div>
          <div id="stock">
            <h1 className="font-semibold">stock</h1>
            <div className="flex justify-between gap-4 p-5 items-center ">
              <span>{stockRange?.gte}</span>

              <ReactSlider
                className="react-slider"
                thumbClassName="react-slider__thumb"
                trackClassName="react-slider__track"
                renderThumb={(props) => <div {...props} />}
                renderTrack={(props, state) => (
                  <div
                    {...props}
                    className={`react-slider__track ${
                      state.index === 1 ? "react-slider__track-1" : ""
                    }`}
                  />
                )}
                min={stockGlobalRange?.gte}
                value={[stockRange?.gte, stockRange?.lte]}
                onChange={(value) =>
                  setStockRange({
                    gte: Number(value[0]),
                    lte: Number(value[1]),
                  })
                }
                max={stockGlobalRange?.lte}
              />
              <span>{stockRange?.lte}</span>
            </div>
          </div>
          <div id="rating">
            <h1 className="font-semibold">rating</h1>
            <div className="flex justify-between gap-4 p-5 items-center ">
              <span>{ratingRange?.gte}</span>

              <ReactSlider
                className="react-slider"
                thumbClassName="react-slider__thumb"
                trackClassName="react-slider__track"
                renderThumb={(props) => <div {...props} />}
                renderTrack={(props, state) => (
                  <div
                    {...props}
                    className={`react-slider__track ${
                      state.index === 1 ? "react-slider__track-1" : ""
                    }`}
                  />
                )}
                min={ratingGlobalRange?.gte}
                value={[ratingRange?.gte, ratingRange?.lte]}
                onChange={(value) =>
                  setRatingRange({
                    gte: Number(value[0]),
                    lte: Number(value[1]),
                  })
                }
                max={ratingGlobalRange?.lte}
              />
              <span>{ratingRange?.lte}</span>
            </div>
          </div>
          <div id="sales">
            <h1 className="font-semibold">sales</h1>
            <div className="flex justify-between gap-4 p-5 items-center ">
              <span>{salesRange?.gte}</span>

              <ReactSlider
                className="react-slider"
                thumbClassName="react-slider__thumb"
                trackClassName="react-slider__track"
                renderThumb={(props) => <div {...props} />}
                renderTrack={(props, state) => (
                  <div
                    {...props}
                    className={`react-slider__track ${
                      state.index === 1 ? "react-slider__track-1" : ""
                    }`}
                  />
                )}
                min={salesGlobalRange?.gte}
                value={[salesRange?.gte, salesRange?.lte]}
                onChange={(value) =>
                  setSalesRange({
                    gte: Number(value[0]),
                    lte: Number(value[1]),
                  })
                }
                max={salesGlobalRange?.lte}
              />
              <span>{salesRange?.lte}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 w-full">
          <button
            type="button"
            className="w-full font-semibold bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 hover:bg-black/80 hover:text-white rounded-lg p-2"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="submit"
            onClick={handleFilterSubmit}
            className="w-full font-semibold bg-blue-500 hover:bg-blue-400 text-white hover:text-white rounded-lg p-2"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductsFilter;
