import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

   const navigate = useNavigate();

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
  const handleSignUp = () => {
    console.log('signUp');
    let isValid = true;
  
    if (firstName === "") {
      setFirstNameError(true);
      isValid = false;
    } else {
      setFirstNameError(false);
    }
  
    if (lastName === "") {
      setLastNameError(true);
      isValid = false;
    } else {
      setLastNameError(false);
    }
  
   
    console.log("email ", email);
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
  
    setIsLoadingSignUp(true);
  
    const userData = { "name":firstName + " " + lastName, email, password };
  
    axios
      .post("http://localhost:3001/api/auth/signUp", userData)
      .then((res) => {
        console.log("res.status", res.status);
        if (res.status === 201) {
          setIsLoadingSignUp(false);
          toast.success("Successfully Signed up", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        setTimeout(() => {
          navigate("/login");
        }, 2000);
        console.log("res : ", res.data);
      })
      .catch((error) => {
        setIsLoadingSignUp(false);
        console.log("error", error);
        toast.error(`${error.response.data.message || "Signup failed"} !`, {
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
      
      <div className="flex my-10 justify-center h-1/2">
        <div className=" w-1/2 flex  justify-center items-center h-1/2 mx-10">
          <div className="w-full ">
            {/* <img
              src={require("../../assets/images/eduacent.png")}
              alt=""
              className="mb-0"
            /> */}
            <div className="w-full flex justify-center">
              <img
                src={require("../../assets/images/image.png")}
                alt=""
                style={{ width: "550px", height: "550px"}}
              />              
            </div>

          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center h-full">
          <Card
            color="transparent"
            shadow={false}
            className="ml-10 w-3/4 gap-3"
          >
            <Typography
              variant="h4"
              color="black"
              className="font-normal text-3xl text-[#2196f3] font-roboto flex justify-center items-center mt-8 pb-8"
            >
              Let’s get started
            </Typography>
            <form className="  mb-2 w-full max-w-screen-xl sm:w-full">
              <div className=" flex flex-col gap-3">
                <div className="gap-4 flex    w-full  ">
                  <div className="w-1/2">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      First Name
                    </Typography>
                    <div>
                      <Input
                        size="lg"
                        placeholder="First Name"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          console.log("firstName", firstName);
                          setFirstNameError(false);
                        }}
                        error={firstNameError ? "border-red-500" : ""}
                      />
                      <p className="text-red-700">
                        {firstNameError ? "First name is required" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      Last Name
                    </Typography>
                    <div>
                      <Input
                        size="lg"
                        placeholder="Last Name"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          setLastNameError(false);
                        }}
                        error={lastNameError ? "border-red-500" : ""}
                      />
                      <p className="text-red-700">
                        {lastNameError ? "Last name is required" : ""}
                      </p>
                    </div>
                  </div>
                </div>
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Your Email
                </Typography>
                <div>
                  <Input
                    size="lg"
                    placeholder="Email"
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
               
                <div className="gap-4 flex w-full">
                  <div className="w-1/2">
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Password
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
                  <div className="w-1/2">
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Confirm Password
                    </Typography>
                    <Input
                      type="password"
                      size="lg"
                      placeholder="********"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 border-cyan-100"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => {
                        if (e.target.value !== password) {
                          setPasswordNotMatch(true);
                        } else {
                          setPasswordNotMatch(false);
                        }
                      }}
                      error={
                        passwordNotMatch
                          ? "border-red-500 !border-t-red-500"
                          : ""
                      }
                    />
                    <p className="text-red-700">
                      {passwordNotMatch ? "Passwords not match" : ""}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                className="mt-6 bg-[#2196f3] flex justify-center"
                fullWidth
                onClick={(e) => handleSignUp()}
                loading={isLoadingSignUp}
              >
                sign up
              </Button>
              <Typography
                variant="h4"
                color="black"
                className="font-normal text-xl text-[#2196f3] font-roboto flex justify-center items-center mt-4"
              >
                Do you have an account?{" "}
              </Typography>
              <Link to={"/signin"}>
                {" "}
                <Button
                  className="mt-6 bg-inherit  text-[#2196f3] border-[#2196f3]  border-solid border-2"
                  fullWidth
                >
                  sign In
                </Button>
              </Link>
            </form>
          </Card>
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
      </div>
    </>
  );
};

export default SignUp;