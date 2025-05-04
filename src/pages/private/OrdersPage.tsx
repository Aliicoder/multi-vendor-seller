import { useCallback, useState } from "react"
import { CiSearch } from "react-icons/ci"
import useOrdersPagination from "@/hooks/useOrdersPagination"
import Pagination from "@/components/shared/Pagination"
import { IOrder, ORDER_STATUS } from "@/types/types"
import CustomButton from "@/components/buttons/CustomButton"
import Absolute from "@/components/styled/Absolute"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TbFilter } from "react-icons/tb"
import toast from "react-hot-toast"
import { useConfirmOrderMutation } from "@/store/apiSlices/orderSlice"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { currencyFormatter } from "@/lib/helpers/currencyFormatter"

function PendingOrdersPage() {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)

  const [orderId, setOrderId] = useState("")
  const [perPage, setPerPage] = useState(5)
  const [status, setStatus] = useState<ORDER_STATUS>("pending")
  const [sort, setSort] = useState<any>([])

  const [openFilter, setOpenFilter] = useState(false)
  const navigate = useNavigate()
  const { orders, counter, handleLeft, handleRight, isLoading } =
    useOrdersPagination({ orderId, status, sort })
  console.log("orders ", orders)
  const [confirmOrderMutation] = useConfirmOrderMutation()
  const handlePerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPerPage(parseInt(e.target.value))
    },
    [perPage]
  )
  const handleSortChange = (name: string, value: string) => {
    setSort((prevSort: string[]) => {
      let updatedSort = prevSort.filter((key) => !key.includes(name))
      if (value !== "default") {
        updatedSort = [value, ...updatedSort]
      }
      return updatedSort
    })
  }
  const handleOrderConfirmation = async (order: IOrder) => {
    try {
      const response = await confirmOrderMutation({
        orderId: order._id,
      }).unwrap()
      toast.success(response.message)
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "something went wrong , try again later"
      )
    }
  }
  const handleOrderCancellation = (order: IOrder) => {}
  const handleOrderStatus = (status: ORDER_STATUS) => {
    setStatus(status)
  }
  const openInGoogleMaps = (lat: number, lon: number) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`
    window.open(url, "_blank")
  }

  return (
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
          />
        </div>

        <CustomButton
          onClick={() => navigate("addProduct")}
          theme="white"
          className="h-9 text-sm ml-auto"
        >
          add product +
        </CustomButton>
      </div>

      <div className="flex font-normal fs-20 gap-3 items-center py-6">
        <Select onValueChange={(value) => handleSortChange("price", value)}>
          <SelectTrigger className="bg-white w-[180px]">
            <SelectValue placeholder="default price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-price">highest to lowest</SelectItem>
            <SelectItem value="price">lowest to highest</SelectItem>
            <SelectItem value="default">default price </SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleSortChange("createdAt", value)}>
          <SelectTrigger className="bg-white w-[180px]">
            <SelectValue placeholder="default date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-createdAt">highest to lowest</SelectItem>
            <SelectItem value="createdAt">lowest to highest</SelectItem>
            <SelectItem value="default">default date</SelectItem>
          </SelectContent>
        </Select>
        <CustomButton
          onClick={() => setOpenFilter(!openFilter)}
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
                            )
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
  )
}

export default PendingOrdersPage
{
  /* <FlexCol className="w-full gap-1 hide-scrollbar overflow-y-scroll">
        {orders &&
          orders?.map((order: IOrder) => (
            <Border
              key={order?.unit?.productId?._id}
              className="flex bg-white rounded-md basis-3/12 mt-3 mx-3 shrink-0"
            >
              <FlexCol className="gap-2">
                <FlexRow>
                  <Flex className="justify-center | basis-1/4 items-center overflow-hidden shrink-0">
                    <img
                      className="p-4 aspect-square object-contain 
                    md:p-10 "
                      src={order?.unit?.productId?.media[0]?.url}
                      alt=""
                    />
                  </Flex>

                  <FlexCol
                    className=" p-6 gap-3 justify-center 
                  md:pl-6"
                  >
                    <FlexRow className="fs-13 gap-3 items-center">
                      <Text className="font-semibold">
                        {order.unit?.productId?.name}
                      </Text>
                      <Text>
                        <span className="text-blue-500 px-3">ordered in</span>{" "}
                        {dateFormatter(order?.createdAt)}
                      </Text>
                      <Text
                        className="text-red-500 cursor-pointer underline"
                        onClick={() =>
                          openInGoogleMaps(
                            order?.address?.lat,
                            order?.address?.lon
                          )
                        }
                      >
                        location
                      </Text>
                    </FlexRow>
                    <FlexRow className="fs-13 gap-3">
                      <Text className="bg-red-100 rounded-md text-red-500 px-2 py-1">
                        {order?.quantity}
                      </Text>
                      <Text
                        className="rounded-md fs-10 py-1 px-2 bg-yellow-100 text-yellow-500
                      md:fs-13"
                      >
                        {order?.status}
                      </Text>
                      <Text
                        className="rounded-md fs-10 py-1 px-2 bg-gray-100 text-gray-500
                      md:fs-13"
                      >
                        {order?._id}
                      </Text>
                    </FlexRow>
                    <Text className="w-9/12 c2 line-clamp-3">
                      {order?.unit.productId?.description}
                    </Text>
                    <FlexRow className="gap-3">
                      <FlexRow
                        className="rounded-md gap-1 fs-10 py-1 px-2 bg-blue-100 text-blue-500
                      md:fs-13"
                      >
                        <Text>{order?.amount}</Text>
                        <Text>$</Text>
                      </FlexRow>
                      <FlexRow
                        className="rounded-md fs-10 py-1 px-2 bg-gray-100 text-gray-500
                      md:fs-13"
                      >
                        <Text>{order?.address?.province},</Text>
                        <Text>{order?.address?.city},</Text>
                        <Text>{order?.address?.area},</Text>
                        <Text>{order?.address?.pinCode}</Text>
                      </FlexRow>
                      <FlexRow
                        className="rounded-md gap-2 fs-10 py-1 px-2 bg-blue-100 text-blue-500
                      md:fs-13"
                      >
                        <Text>phone</Text>
                        <Text>{order?.address?.phone}</Text>
                      </FlexRow>
                    </FlexRow>

                    <FlexRow className="gap-3">
                      <CustomButton
                        onClick={() => handleOrderCancellation(order)}
                        className="c5 px-3 py-2  gap-3 h-full flex items-center font-medium border rounded-md shadow-sm text-red-500 bg-white 
                        md:c3"
                        text="Cancel"
                        direction={"right"}
                      ></CustomButton>
                      {order.status == "pending" && (
                        <CustomButton
                          onClick={() => handleOrderConfirmation(order)}
                          className="c5 px-3 h-full gap-3 flex items-center font-medium border rounded-md shadow-sm  text-blue-500 bg-white 
                        md:c3"
                          text="Confirm order"
                          direction={"right"}
                        ></CustomButton>
                      )}
                    </FlexRow>
                  </FlexCol>
                </FlexRow>
              </FlexCol>
            </Border>
          ))}
      </FlexCol> */
}
