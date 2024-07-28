import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

function Content({ toggleDrawer }) {
  return (
    <div className="overflow-auto scrollbar">
      <Header toggleDrawer={toggleDrawer} />
      <Outlet />
    </div>
  );
}

export default Content;
