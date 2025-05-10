import ReactSlider from "react-slider";
import { useSelector } from "react-redux";
import {
  resetFilter,
  setAmountLocalRange,
  setIsFilterOpen,
  setQuantityLocalRange,
} from "@/store/Reducers/Filters/ordersFilter";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoMdClose } from "react-icons/io";
import {
  selectOrdersFilter,
  setDeliveryStatus,
} from "@/store/Reducers/Filters/ordersFilter";

function OrdersFilter() {
  const {
    amountLocalRange,
    amountGlobalRange,
    quantityLocalRange,
    quantityGlobalRange,
  } = useSelector(selectOrdersFilter);
  const [amountRange, setAmountRange] = useState({
    gte: amountLocalRange?.gte,
    lte: amountLocalRange?.lte,
  });
  const [quantityRange, setQuantityRange] = useState({
    gte: quantityLocalRange?.gte,
    lte: quantityLocalRange?.lte,
  });
  const [deliveryLocalStatus, setDeliveryLocalStatus] = useState("");
  const dispatch = useDispatch();

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setAmountLocalRange(amountRange));
    dispatch(setQuantityLocalRange(quantityRange));
    dispatch(setDeliveryStatus(deliveryLocalStatus));
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
          <div id="amount">
            <h1 className="font-semibold">Amount</h1>
            <div className="flex justify-between gap-4 p-5 items-center ">
              <span>{amountRange?.gte}</span>

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
                min={amountGlobalRange?.gte}
                value={[amountRange?.gte, amountRange?.lte]}
                onChange={(value) =>
                  setAmountRange({
                    gte: Number(value[0]),
                    lte: Number(value[1]),
                  })
                }
                max={amountGlobalRange?.lte}
              />
              <span>{amountRange?.lte}</span>
            </div>
          </div>
          <div id="quantity">
            <h1 className="font-semibold">Quantity</h1>
            <div className="flex justify-between gap-4 p-5 items-center ">
              <span>{quantityRange?.gte}</span>

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
                min={quantityGlobalRange?.gte}
                value={[quantityRange?.gte, quantityRange?.lte]}
                onChange={(value) =>
                  setQuantityRange({
                    gte: Number(value[0]),
                    lte: Number(value[1]),
                  })
                }
                max={quantityGlobalRange?.lte}
              />
              <span>{quantityRange?.lte}</span>
            </div>
          </div>
          <div id="status">
            <div className="flex justify-between gap-4 items-center ">
              <Select onValueChange={(value) => setDeliveryLocalStatus(value)}>
                <SelectTrigger className="bg-white w-full">
                  <SelectValue placeholder="delivery status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="pending">pending status</SelectItem>
                  <SelectItem value="confirmed">confirmed status </SelectItem>
                </SelectContent>
              </Select>
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

export default OrdersFilter;
