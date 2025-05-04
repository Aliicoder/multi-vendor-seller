import { messages, stats } from "@/constants/dashboard"
import { HiArrowTrendingUp } from "react-icons/hi2"
import { HiArrowTrendingDown } from "react-icons/hi2"
import CountUp from "react-countup"
import { cn, getInitials } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import useProductsPagination from "@/hooks/useProductsPagination"
import { IProduct } from "@/types/types"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/store/Reducers/authReducer"
const perPage = 2

function SellerDashboard() {
  const statRef = useRef<HTMLDivElement>(null)
  const { userId } = useSelector(selectCurrentUser)
  const [statHeight, setStatHeight] = useState(0)
  const { products } = useProductsPagination({
    sellerId: userId,
    perPage,
  })
  useEffect(() => {
    const updateHeight = () => {
      if (statRef.current) {
        setStatHeight(statRef.current.offsetHeight)
      }
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])
  return (
    <div className="flex flex-col p-6 gap-5 grow relative">
      <h1 className="text-blue-600 font-bold">Dashboard</h1>
      <div id="stat-messages" className="flex w-full gap-5">
        <div
          id="stat-applicants"
          ref={statRef}
          className="flex flex-col basis-8/12 gap-5"
        >
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => {
              return (
                <div
                  key={i}
                  className=" p-5 gap-3  montserrat flex flex-col rounded-lg border border-neutral-100 bg-white 
                  [&:nth-child(n+5)]:border-blue-500"
                >
                  <h1 className="text-fs-16 text-gray-700 font-semibold">
                    {stat.title}{" "}
                  </h1>
                  <div className="flex gap-3">
                    <div className="font-semibold">{stat.prefix}</div>
                    <CountUp
                      className="text-fs-49 font-bold"
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    {stat.trend == "up" ? (
                      <HiArrowTrendingUp color="green" />
                    ) : (
                      <HiArrowTrendingDown color="red" />
                    )}
                    <h1> {stat.change} vs last month</h1>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          id="messages"
          style={{ maxHeight: `${statHeight}px` }}
          className="flex flex-col bg-gray-gradient basis-4/12 overflow-hidden relative"
        >
          <div className="flex justify-between items-center mr-10">
            <h1 className="p-5 text-sm font-semibold montserrat">
              Latest messages
            </h1>
            <h1>chats</h1>
          </div>
          <div className="flex flex-col rounded-thumb gap-3 hide-track overflow-y-scroll px-3">
            {messages.map((message, i) => {
              return (
                <div
                  key={i}
                  className="flex bg-white border border-neutral-100 p-3 rounded-lg gap-5 items-center"
                >
                  <div
                    id="avatar"
                    className="size-10 flex shrink-0 justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                                          bg-blue-500 text-white"
                  >
                    {getInitials(message.name)}
                  </div>
                  <div className="flex flex-col w-full font-medium max-md:hidden">
                    <div className="flex justify-between">
                      <h1 className="text-fs-16 w-[15ch] font-semibold truncate">
                        {message?.name}
                      </h1>
                      <h1 className="text-fs-10">{message.time}</h1>
                    </div>
                    <h1 className="text-fs-13 w-[15ch] truncate">
                      {message.message}
                    </h1>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <h1 className="p-5 text-sm font-semibold montserrat">Latest products</h1>
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="border-separate border-spacing-y-4 w-full">
          <thead>
            <tr>
              <th>_Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((product: IProduct) => (
                <>
                  <tr key={product._id} className="border border-b text-center">
                    <td className="p-5">
                      <h1 className="m-auto text-center w-[10ch] truncate">
                        {product._id}
                      </h1>
                    </td>
                    <td>
                      <div className="relative">
                        {product.media &&
                          product.media.map((image, i) => {
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
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product?.discount}%</td>
                    <td>{product.stock}</td>
                    <td>20</td>
                    <td>4.5</td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SellerDashboard
