import { Button, Card, Checkbox, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import EnrollmentCard from "../components/cards/Enrollmentcard";

const Enrollment = () => {
  const [Enrollment, setEnrollment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/api/enrollments");
        console.log(response);
        
        setEnrollment(response.data.data);
        console.log(response.data.data);
        
      } catch (error) {
        toast.error("Failed to fetch Enrollment!");
        console.error("Error fetching Enrollment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleUnenroll = (enrollmentId) => {
    console.log("Unenrolled:", enrollmentId);
   
    
    axiosInstance
          .delete(`/api/enrollments/${enrollmentId}`)
          .then((res) => {
            if (res.status === 200) {
              toast.success("Successfully Unenrolled", {
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
            setEnrollment((prevCourses) => prevCourses.filter(enrollment => enrollment.id !== enrollmentId));
          })
          .catch((error) => {
            
            toast.error(`${error.response.data.message} !`, {
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
  
    // Filter out the unenrolled course from the list
    
  };

  return (
    <div className="p-4 mx-12">
      <ToastContainer />
      <Typography
  variant="h4"
  className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500  text-center uppercase tracking-wide my-4 mb-8"
>
  ✨ Enrollment   List ✨
</Typography>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid h-[100vh] overflow-x-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {Enrollment.map((enroll) => (
            <EnrollmentCard
            key={enroll.id}
            enroll={enroll}
            onEnroll={handleUnenroll}
            isEnrolled={true}
          />
          ))}
        </div>
      )}
    </div>
  );
};

export default Enrollment;
