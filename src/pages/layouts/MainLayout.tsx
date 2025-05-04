import Sidebar from "@/components/layouts/Sidebar"
import RelativeFlexRowContainer from "@/components/styled/RelativeFlexRowContainer"
import { Outlet } from "react-router-dom"
function MainLayout() {
  return (
    <div
      className={`relative transition-all text-[--text-color] bg-[#eff6ff80]`}
    >
      <RelativeFlexRowContainer
        className={`container mx-auto relative h-[100vh] flex flex-row`}
      >
        <Sidebar />
        <div
          className={`relative  w-full h-full flex flex-col justify-between  overflow-y-scroll hide-scrollbar`}
        >
          <Outlet />
        </div>
      </RelativeFlexRowContainer>
    </div>
  )
}

export default MainLayout
