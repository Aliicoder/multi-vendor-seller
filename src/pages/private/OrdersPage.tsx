import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import useOrdersPagination from "@/hooks/useOrdersPagination";
import Pagination from "@/components/shared/Pagination";
import { IOrder } from "@/types/types";
import CustomButton from "@/components/buttons/CustomButton";
import Absolute from "@/components/styled/Absolute";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TbFilter } from "react-icons/tb";
import { useConfirmOrderMutation } from "@/store/apiSlices/orderSlice";
import { cn, errorToast, successToast } from "@/lib/utils";
import { currencyFormatter } from "@/lib/helpers/currencyFormatter";
import useSetTimeout from "@/hooks/useSetTimeout";
import OrdersFilter from "@/components/shared/Filters/OrdersFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrdersFilter,
  setIsFilterOpen,
} from "@/store/Reducers/Filters/ordersFilter";
import { selectCurrentUser } from "@/store/Reducers/authReducer";

function PendingOrdersPage() {
  const { userId } = useSelector(selectCurrentUser);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const { timeouter } = useSetTimeout();
  const { deliveryStatus, isFilterOpen, amountLocalRange, quantityLocalRange } =
    useSelector(selectOrdersFilter);
  const dispatch = useDispatch();

  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState<any>([]);
  const [searchId, setSearchId] = useState("");

  const { orders, counter, handleLeft, handleRight } = useOrdersPagination({
    orderId: searchId,
    userId,
    perPage,
    deliveryStatus,
    sort,
    amount: amountLocalRange,
    quantity: quantityLocalRange,
  });
  const [confirmOrderMutation] = useConfirmOrderMutation();

  const handleSortChange = (name: string, value: string) => {
    setSort((prevSort: string[]) => {
      let updatedSort = prevSort.filter((key) => !key.includes(name));
      if (value !== "default") {
        updatedSort = [value, ...updatedSort];
      }
      return updatedSort;
    });
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    timeouter(() => {
      if (value.length >= 2) setSearchId(value);
      else setSearchId("");
    }, 2000);
  };
  const handleOrderConfirmation = async (order: IOrder) => {
    try {
      const response = await confirmOrderMutation({
        orderId: order._id,
      }).unwrap();
      successToast(response.message);
    } catch (error: any) {
      errorToast(error?.data?.message);
    }
  };
  const handleOrderCancellation = (order: IOrder) => {};

  const openInGoogleMaps = (lat: number, lon: number) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {isFilterOpen && (
        <div className="fixed top-0 left-0 w-[100svw] h-[100svh] z-[100] bg-black/50">
          <OrdersFilter />
        </div>
      )}
      <div className="flex flex-col p-6 w-full gap-5">
        <div className="flex font-normal gap-5 items-center py-6 relative">
          <div
            className=" px-2 py-3 text-blue-500  flex items-center h-9 border text-sm 
          shadow-sm rounded-lg overflow-hidden bg-white border-neutral-200"
          >
            <div className="font-bold fs-20">
              <CiSearch className="m-1 cursor-pointer" />
            </div>
            <input
              placeholder="search "
              className={`pl-3  w-full font-sans  outline-none bg-inherit`}
              type="text"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="flex font-normal fs-20 gap-3 items-center py-6">
          <Select onValueChange={(value) => handleSortChange("amount", value)}>
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder="default price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-amount">highest to lowest</SelectItem>
              <SelectItem value="amount">lowest to highest</SelectItem>
              <SelectItem value="default">default price </SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleSortChange("createdAt", value)}
          >
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder="default date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">newest to oldest</SelectItem>
              <SelectItem value="createdAt">oldest to newest</SelectItem>
              <SelectItem value="default">default date</SelectItem>
            </SelectContent>
          </Select>
          <CustomButton
            onClick={() => dispatch(setIsFilterOpen(!isFilterOpen))}
            className="flex h-9 text-sm gap-3 items-center ml-auto"
          >
            Filter
            <TbFilter />
          </CustomButton>
          <Absolute className="h-full w-[100svw] left-full top-0 z-[100]" />
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
          <table className="border-separate border-spacing-y-4 w-full">
            <thead>
              <tr>
                <th>_Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>quantity</th>
                <th>status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders ? (
                orders.length > 0 &&
                orders.map((order: IOrder) => (
                  <>
                    <tr key={order._id} className="border border-b text-center">
                      <td className="p-5">
                        <h1 className="m-auto text-center w-[10ch] truncate">
                          {order._id}
                        </h1>
                      </td>
                      <td>
                        <div className="relative">
                          {order.productId &&
                            order.productId?.media?.map((image, i) => {
                              return (
                                <div
                                  style={{ marginLeft: i * 20 }}
                                  className={cn(
                                    "rounded-full overflow-hidden border border-blue-500 w-12 h-12",
                                    i > 0 && "absolute left-0 top-0"
                                  )}
                                >
                                  {image.url ? (
                                    <img
                                      className="h-full w-full object-cover"
                                      src={image.url}
                                      alt=""
                                    />
                                  ) : (
                                    <span className="text-gray-400">
                                      No Image
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </td>

                      <td>
                        {" "}
                        <h1 className="m-auto text-center w-[15ch] truncate">
                          {order.productId.name}
                        </h1>
                      </td>
                      <td>{currencyFormatter("INR", order.amount)}</td>
                      <td>{order.quantity}</td>
                      <td>{order.status}</td>

                      <td>
                        <button
                          className="bg-blue-500 rounded text-white px-4 py-2"
                          onClick={() =>
                            setExpandedRowId(
                              expandedRowId === order._id ? null : order._id
                            )
                          }
                        >
                          Actions
                        </button>
                      </td>
                    </tr>
                    {expandedRowId === order._id && (
                      <tr className="bg-slate-50">
                        <td colSpan={10} className="p-4 text-center">
                          <button
                            onClick={() => handleOrderConfirmation(order)}
                            className="bg-green-500 rounded text-white mr-2 px-3 py-2"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleOrderCancellation(order)}
                            className="bg-red-500 rounded text-white mr-2 px-3 py-2"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() =>
                              openInGoogleMaps(
                                order.address.lat,
                                order.address.lon
                              )
                            }
                            className="bg-yellow-500 rounded text-white px-3 py-2"
                          >
                            View address
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td className="bg-slate-50 p-5 text-center" colSpan={10}>
                    <h1>empty list</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-evenly p-6 items-center">
          <div />
          <Pagination
            className="m-8"
            counter={counter}
            onLeftClick={handleLeft}
            onRightClick={handleRight}
          />
          <div className="flex gap-3 ml-auto">
            <select
              onChange={(e) => setPerPage(+e.target.value)}
              className="bg-transparent fs-16"
            >
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
            <h1 className="text-sm">Per page</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingOrdersPage;
