import { MenuList } from "@Data/Layout/SidebarData"
import { MenuItem } from "@Types/LayoutTypes"
import { Fragment, useState } from "react"
import Menulist from "./Menulist"
import { useAppSelector } from "@Redux/Hooks"

const SidebarMenuList = () => {
  const [activeMenu, setActiveMenu] = useState([]);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const shouldHideMenu = (mainMenu: MenuItem) => {return mainMenu?.Items?.map((data) => data.title).every((titles) =>pinedMenu.includes(titles || ""));};
  return (
    <>
      {MenuList &&
        MenuList.map((mainMenu: MenuItem, index) => (
          <Fragment key={index}>
            <li className={`sidebar-main-title ${shouldHideMenu(mainMenu) ? "d-none" : ""}`}>
              <div>
                <h5 className={`f-w-700 sidebar-title ${mainMenu.lanClass && mainMenu.lanClass}`}>{(mainMenu.title)}</h5>
              </div>
            </li>
            <Menulist menu={mainMenu.Items} activeMenu={activeMenu} setActiveMenu={setActiveMenu}  level={0}/>
          </Fragment>
        ))}
    </>
  )
}

export default SidebarMenuList