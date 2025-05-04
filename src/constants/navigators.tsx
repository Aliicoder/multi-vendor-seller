import { VscDashboard } from "react-icons/vsc"
import { TbMessageChatbot } from "react-icons/tb"
import { BiCartAlt } from "react-icons/bi"
import { PiChatsCircle } from "react-icons/pi"
import { AiOutlineProduct } from "react-icons/ai"
import { RiUserSettingsLine } from "react-icons/ri"
import { VscSymbolClass } from "react-icons/vsc"
import { ReactNode } from "react"
export interface ISubNavigator {
  title: string
  link: string
  segment: string
}
export interface IMainNavigators {
  title: string
  icon: ReactNode
  link: string
  segment: string
  subNavigators?: ISubNavigator[]
}
export const mainNavigators: IMainNavigators[] = [
  {
    title: "Dashboard",
    segment: "dashboard",
    icon: <VscDashboard />,
    link: "/",
  },
  {
    title: "Products",
    segment: "products",
    icon: <AiOutlineProduct />,
    link: "/products",
  },
  {
    title: "Orders",
    segment: "orders",
    icon: <BiCartAlt />,
    link: "/orders",
  },
  {
    title: "Categories",
    segment: "categories",
    icon: <VscSymbolClass />,
    link: "/categories",
  },
  {
    title: "Merchant Assist",
    segment: "merchantsssist",
    icon: <PiChatsCircle />,
    link: "/merchant-assist",
  },
  {
    title: "Support Link",
    segment: "support link",
    icon: <TbMessageChatbot />,
    link: "/supportlink",
  },
  {
    title: "Settings",
    segment: "settings",
    icon: <RiUserSettingsLine />,
    link: "/settings",
  },
]

// export interface ISellerProfileNavigator {
//   id: number
//   title: string
//   icon: JSX.Element
//   link: string
// }
// export const sellerProfileNavigators = [
//   {
//     id:1,
//     title:"Profile Settings",
//     icon:<IoPersonOutline className="c2 h-full w-full"/>,
//     link:"details"
//   },{
//     id:2,
//     title:"Password",
//     icon:<MdSecurity className="c2 h-full w-full"/>,
//     link:"password"
//   },{
//     id:3,
//     title:"Notifications",
//     icon:<MdOutlineNotificationsActive className="c2 h-full w-full"/>,
//     link:"notifications"
//   },{
//     id:4,
//     title:"Verification",
//     icon:<GoVerified className="c2 h-full w-full"/>,
//     link:"verification"
//   }
// ]
