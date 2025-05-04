import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { z } from "zod"
import { RiSendPlaneFill } from "react-icons/ri"
import {
  useAddMessageMutation,
  useGetChatMessagesQuery,
} from "@/store/apiSlices/chatSlice"
import { IChat, IMessage, IParticipant } from "@/types/types"
import { useEffect, useState } from "react"
import { socket } from "@/lib/socket"
import { selectCurrentUser } from "@/store/Reducers/authReducer"
import { useSelector } from "react-redux"
import { cn, errorToast, getInitials } from "@/lib/utils"
import CustomButton from "@/components/buttons/CustomButton"
import dateFormatter from "@/lib/helpers/dateFormatter"
const formSchema = z.object({
  message: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
function SellerChatPage() {
  const [liveMessages, setLiveMessages] = useState<IMessage[]>([])
  const [messages, setMessages] = useState<IMessage[]>([])
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  const [participant, setParticipant] = useState<IParticipant | null>(null)
  const chat = useLocation().state.chat as IChat
  const { data: response, isSuccess } = useGetChatMessagesQuery(
    {
      chatId: chat._id,
    },
    {
      skip: Boolean(chat._id) == false,
    }
  )
  const [addMessageMutation] = useAddMessageMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })
  useEffect(() => {
    if (liveMessages && liveMessages.length > 0)
      socket.emit(
        "user>>SendMessage>>participant",
        liveMessages[liveMessages.length - 1]
      )
    return () => {
      socket.off("user>>SendMessage>>participant")
    }
  }, [liveMessages])
  useEffect(() => {
    const receiveMessage = (message: any) => {
      setLiveMessages((prev: any) => [...prev, message])
    }
    socket.on("participant<<ReceiveMessage<<user", receiveMessage)
    return () => {
      socket.off("participant<<ReceiveMessage<<user", receiveMessage)
    }
  }, [])
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const recentMessage = {
        chatId: chat._id,
        message: values?.message,
        senderId: user.userId,
        receiverId: participant?.userId,
        createdAt: Date.now(),
      }
      await addMessageMutation(recentMessage).unwrap()
      setLiveMessages((prev: any) => [...prev, recentMessage])
    } catch (error) {
      errorToast(error)
    }
  }
  useEffect(() => {
    if (chat) {
      const participant = chat.participants.filter(
        (participant) => participant.userId._id != user.userId
      )[0]
      setParticipant(participant)
    }
  }, [chat])
  useEffect(() => {
    if (isSuccess && response?.messages && response?.messages.length > 0) {
      setMessages(response?.messages)
      console.log("messages ", response?.messages)
    }
  }, [messages])
  return (
    <div className="flex w-full  flex-col justify-end">
      <div key={chat._id} className="flex items-center gap-5 b p-5 ">
        <div className=" flex justify-end">
          <div
            id="avatar"
            onClick={() => navigate("/account/orders")}
            className={cn(`size-10 flex shrink-0 justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                  bg-blue-500 text-white`)}
          >
            {participant && getInitials(participant.userId.name)}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className=" text-fs-16s font-bold">
            {participant && participant.userId.name}
          </h1>
          <h1 className=" text-fs-13 font-semibold">start chat</h1>
        </div>
      </div>
      <div
        id="chat"
        className="flex flex-col justify-end grow bg-blue-50 overflow-y-scroll"
      >
        <>
          {response?.messages &&
            response?.messages?.length > 0 &&
            response?.messages.map((message: IMessage) => (
              <div
                key={message._id}
                className={cn(
                  "flex",
                  message?.senderId == user.userId && "flex-row-reverse"
                )}
              >
                <div className="flex flex-col p-2 m-3 rounded-md bg-white w-fit max-w-[50%]  text-wrap ">
                  <h1 className="text-fs-16">{message?.message}</h1>
                  <p
                    className={cn(
                      "uppercase text-fs-10 mt-2",
                      message?.senderId == user.userId && "text-end"
                    )}
                  >
                    {dateFormatter(message?.createdAt, "time")}
                  </p>
                </div>
              </div>
            ))}
        </>
        <>
          {liveMessages &&
            liveMessages.map((message: IMessage) => (
              <div
                key={message._id}
                className={cn(
                  "flex",
                  message?.senderId == user.userId && "flex-row-reverse"
                )}
              >
                <div className="flex flex-col p-2 m-3 rounded-md bg-white w-fit max-w-[50%]  text-wrap ">
                  <h1 className="text-fs-16">{message?.message}</h1>
                  <p
                    className={cn(
                      "uppercase text-fs-10 mt-2",
                      message?.senderId == user.userId && "text-end"
                    )}
                  >
                    {dateFormatter(message?.createdAt, "time")}
                  </p>
                </div>
              </div>
            ))}
        </>
      </div>

      <div className="">
        <Form {...form}>
          <form
            id="message-input"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex  gap-[3%] m-5"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Type here ..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <CustomButton theme="blue" type="submit">
              <RiSendPlaneFill />
            </CustomButton>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SellerChatPage
