import { socket } from "@/lib/socket"
import { cn, getInitials } from "@/lib/utils"
import { selectCurrentUser } from "@/store/Reducers/authReducer"
import { useGetChatsQuery } from "@/store/apiSlices/chatSlice"
import { IAuthState, IChat } from "@/types/types"
import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

function SellersChatsLayout() {
  const [activeParticipants, setActiveParticipants] = useState<any[]>([])
  const [chats, setChats] = useState<IChat[] | null>(null)
  const user = useSelector(selectCurrentUser)
  const { data: response, isSuccess } = useGetChatsQuery({
    userType: "seller",
  })
  const navigate = useNavigate()
  const activeUserInfo = useSelector(selectCurrentUser)
  useEffect(() => {
    if (response?.chats) {
      socket.connect()
      socket.emit("user>>Connect>>participant", activeUserInfo, response?.chats)
    }
    return () => {
      socket.disconnect()
    }
  }, [response?.chats])
  useEffect(() => {
    const handleReceivingParticipantAndSendingUserInfoThrowParticipantSocket = (
      activeParticipantInfo: IAuthState,
      activeParticipantSocketId: any
    ) => {
      let isParticipantExists = activeParticipants.some(
        (seller: any) => seller.userId === activeParticipantInfo.userId
      )
      if (!isParticipantExists)
        setActiveParticipants((prev: any) => [...prev, activeParticipantInfo])
      socket.emit(
        "user>>SynAck>>participant",
        activeUserInfo,
        activeParticipantSocketId
      )
    }
    const handleReceivingSellerInfo = (activeSellerInfo: any) => {
      let isSellerExists = activeParticipants.some(
        (seller: any) => seller.userId === activeSellerInfo.userId
      )
      if (!isSellerExists)
        setActiveParticipants((prev: any) => [...prev, activeSellerInfo])
    }
    const handleDisconnectedSeller = (userId: any) => {
      const filteredSellers = activeParticipants.filter(
        (seller: any) => seller.userId != userId
      )
      setActiveParticipants(filteredSellers) //console.log(`user ${userId} disconnected`)
    }
    socket.on(
      "participant>>Syn>>user",
      handleReceivingParticipantAndSendingUserInfoThrowParticipantSocket
    )
    socket.on("user<<Ack<<participant", handleReceivingSellerInfo)
    socket.on("disconnected", handleDisconnectedSeller)
    return () => {
      socket.off(
        "seller>>Syn>>client",
        handleReceivingParticipantAndSendingUserInfoThrowParticipantSocket
      )
      socket.off("user>>SynAck>>participant")
      socket.off("user<<Ack<<participant", handleReceivingSellerInfo)
      socket.off("disconnected", handleDisconnectedSeller)
    }
  }, [])

  useEffect(() => {
    console.log("activeSellers >>", activeParticipants)
  }, [activeParticipants])
  useEffect(() => {
    if (isSuccess) {
      console.log(response.chats)
      setChats(response.chats)
    }
  }, [isSuccess])
  return (
    <div className="flex m-5 h-full w-full bg-white rounded-md drop-shadow-sm ">
      <div className="flex border-r border-neutral-100 flex-col basis-3/12  ">
        <div>
          <h1 className="font-bold p-6 text-fs-16">Chats</h1>
        </div>

        <div className="flex items-center m-5 bg-blue-50 mt-0 rounded-md overflow-hidden">
          <div className="text-fs-16 mx-5 text-blue-500">
            <CiSearch className="m-1 cursor-pointer" />
          </div>
          <input
            placeholder="Search "
            className={`max-w-[300px] py-2 rounded-lg bg-slate-100 transition-all  outline-none`}
            type="text"
          />
        </div>

        <div className="flex flex-col">
          {chats &&
            chats.map((chat: IChat) => {
              const participant = chat.participants.filter(
                (participant) => participant.userId._id != user.userId
              )[0]
              const isActive = activeParticipants.some(
                (activeParticipant: IAuthState) =>
                  activeParticipant.userId == participant.userId._id
              )
              return (
                <div
                  key={chat._id}
                  onClick={() =>
                    navigate(`/supportlink/${chat._id}`, { state: { chat } })
                  }
                  className="flex items-center gap-5  p-5 border-b border-neutral-100 "
                >
                  <div className="basis-3/12 flex justify-end">
                    <div
                      id="avatar"
                      onClick={() => navigate("/account/orders")}
                      className={cn(
                        `size-10 flex shrink-0 justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                                  bg-blue-500 text-white`,
                        isActive && "ring-green-500"
                      )}
                    >
                      {getInitials(participant.userId.name)}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className=" text-fs-16s font-bold">
                      {participant.userId.name}
                    </h1>
                    <h1 className=" text-fs-13 font-semibold">
                      {chat.recentMessage ? chat.recentMessage : "start chat"}
                    </h1>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default SellersChatsLayout
