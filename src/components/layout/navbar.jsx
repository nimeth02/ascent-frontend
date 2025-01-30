import React from "react";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../../assets/images/eduacent.png"
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
const Navbar = () => {
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["loggedUser"]);

   const navigate = useNavigate();

   const handleLogout = () => {
    // Correct usage of removeCookie
    axiosInstance
      .post("/api/auth/logout",)
      .then((res) => {
        console.log("res ", res);
        if (res.status === 200) {
          toast.success("Successfully Loged out", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          removeCookie("loggedUser", { path: "/" }); 
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.log(error);
        
        toast.error(`${error.response.data.message || "Log Out failed"} !`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  
  }
  
  
  return (
    <nav className="bg-white p-4 flex justify-between items-center h-20">
      <div className="flex-row justify-center items-center ml-7">
        <div>
          <img
            src={logo}
            alt="logo"
            className="ml-4 inline-block items-center w-10"
          />
        </div>
        <div className="items-center text-center font-bold">
          EduAscent
        </div>
      </div>

      <ul className="flex space-x-8 text-gray-700">
        {[
          { name: "All Courses", path: "/" },
          { name: "Enrolled Courses", path: "/enrollment" },
        ].map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`hover:text-blue-500 ${
                location.pathname === link.path ? "text-blue-500 font-semibold border-blue-500" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>


      <div className="flex space-x-6 text-gray-700 items-center mr-7 gap-4 text-center font-bold">
      {cookies?.loggedUser?.user?.name}
         <Button onClick={()=>handleLogout()} className="" >Log out</Button>
      </div>
    </nav>
  );
};

export default Navbar;
