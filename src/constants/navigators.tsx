import { VscDashboard } from "react-icons/vsc";
import { TbMessageChatbot } from "react-icons/tb";
import { BiCartAlt } from "react-icons/bi";
import { PiChatsCircle } from "react-icons/pi";
import { AiOutlineProduct } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscSymbolClass } from "react-icons/vsc";
import { ReactNode } from "react";
import { PiMoney } from "react-icons/pi";

export interface IMainNavigators {
  title: string;
  icon: ReactNode;
  link: string;
  segment: string;
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
    title: "Transactions",
    segment: "transactions",
    icon: <PiMoney />,
    link: "/transactions",
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
];
