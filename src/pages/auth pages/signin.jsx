import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import axiosInstance from "../../utils/axiosInstance";


const SignIn = () => {

  const [cookies, setCookie, removeCookie] = useCookies(["loggedUser"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);

  const navigate = useNavigate();

  const userData = {
    username: email,
    password: password,
  };

  const validateEmail = (email) => {
    console.log(
      "email validation :" +
        String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
    );
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignIn = async () => {
    let isValid = true;

    if (email === "" || !validateEmail(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (password === "" || password.length < 8) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (!isValid) {
      toast.error("Please fill out all required fields correctly.", { position: "top-center", autoClose: 3000 });
      return;
    }

    setIsLoadingSignIn(true);

    const userData = { "username":email, password };

    axiosInstance
      .post("/api/auth/login", userData)
      .then((res) => {
        console.log("res ", res);
        if (res.status === 200) {
          setIsLoadingSignIn(false);
          toast.success("Successfully Loged In", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(res.data);
          
          setCookie("loggedUser", {"isLogged":true,"user":res.data.data.user}, { path: "/", maxAge: 86400 }); 
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        setIsLoadingSignIn(false);
        console.log(error);
        
        toast.error(`${error.response.data.message || "Login failed"} !`, {
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
  };


  return (
    <>
      <div className="flex my-10 justify-center ">
        <div className=" w-1/2 flex  justify-center items-center h-1/2 mx-10">
          <div className="w-full ">
            {/* <img
              src={require("../../images/Planty's Logo.png")}
              alt=""
              className="mb-0"
            /> */}
            <div className="w-full flex justify-center">
              <img
                src={require("../../assets/images/image.png")}
                alt=""
                style={{ width: "550px", height: "550px" }}
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex  justify-center items-center  h-full">
          <Card
            color="transparent"
            shadow={false}
            className="ml-10 w-3/4   gap-3"
          >
            <Typography
              variant="h4"
              color="black"
              className="font-normal text-3xl text-[#2196f3] font-roboto flex justify-center items-center  mt-8 pb-8"
            >
              Welcome !
            </Typography>
            <form className=" mt-4 mb-2 w-full max-w-screen-xl sm:w-full">
              <div className=" flex flex-col gap-4">
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Enter Email
                </Typography>
                <div>
                  <Input
                    size="lg"
                    placeholder="name@gmail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (email !== "" && validateEmail(email)) {
                        setEmailError(false);
                      }
                    }}
                    error={emailError ? "border-red-500" : ""}
                  />
                  <p className="text-red-700">
                    {emailError ? "Enter a valid e-mail" : ""}
                  </p>
                </div>

                <div className="gap-4  my-5   w-full  ">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Enter Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError ? "border-red-500" : ""}
                  />
                  <p className="text-red-700">
                    {passwordError ? "Enter a valid password with 8 characters" : ""}
                  </p>
                </div>
              </div>

              <Button
                className="mt-6 bg-[#2196f3] flex justify-center"
                fullWidth
                loading={isLoadingSignIn}
                onClick={(e) => {
                  console.log("userData", userData);
                  handleSignIn();
                }}
              >
                sign In
              </Button>

              <Typography
                variant="h4"
                color="black"
                className="font-normal text-xl text-[#2196f3] font-roboto flex justify-center items-center mt-4"
              >
                Don't have an account ?{" "}
              </Typography>
              <Link to={"/signup"}>
                {" "}
                <Button
                  className="mt-6 bg-inherit  text-[#2196f3] border-[#2196f3]  border-solid border-2"
                  fullWidth
                >
                  Sign Up
                </Button>
              </Link>
            </form>
          </Card>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default SignIn;
