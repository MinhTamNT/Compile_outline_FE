import React from "react";
import { Header } from "../Layouts/Header";
import { SideBar } from "../Layouts/SideBar";

export const LayoutDefault = ({ children }) => {
  return (
    <div className="wrapper font-roboto bg-bg-default h-screen">
      <Header />
      <div className="container  max-w-full">
        <div className="content md:md-w-[1120px]">{children}</div>
      </div>
    </div>
  );
};
