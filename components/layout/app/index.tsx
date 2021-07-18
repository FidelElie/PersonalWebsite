// ! Next and React
import type { ReactNode } from "react";

// ! Components
import Navbar from "./Navbar";
import Footer from "./Footer";

type props = {
  signOutButton?: boolean,
  buttonText?: string,
  buttonOnClick?: Function,
  children: ReactNode
}

const AppLayout = (props : props) => {
  const { buttonText, buttonOnClick, signOutButton, children } = props;

  const navbarProps = { buttonText, buttonOnClick, signOutButton };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar {...navbarProps}/>
      { children }
      <Footer/>
    </div>
  )
}

export default AppLayout;
