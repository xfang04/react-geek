import React, { useEffect } from "react";
import { request } from "@/utils";

const Layout = () => {
  useEffect(() => {
    request.get("/user/profile").then((res) => {
      console.log(res);
    });
  }, []);
  return <div>Layout</div>;
};

export default Layout;
