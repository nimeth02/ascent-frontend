import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import CourseCard from "../components/cards/Coursecard";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/api/courses"); // Replace with your actual API endpoint
        setCourses(response.data.data.notRegisteredCourses);
        setEnrolledCourses(response.data.data.registeredCourses)
        console.log(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch courses!");
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {


    axiosInstance
      .post("/api/enrollments",{
        "courseId":courseId
    })
      .then((res) => {
        console.log("res.status", res.status);
        if (res.status === 201) {
          const enrolledCourse = courses.find(course => course.id === courseId);

          if (!enrolledCourse) return; // Ensure course exists before modifying state
  
          // Remove from courses and add to enrolledCourses
          setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
          setEnrolledCourses(prevEnrolledCourses => [...prevEnrolledCourses, enrolledCourse]);
          toast.success(`Successfully Enrolled ${enrolledCourse.name}`, {
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

  
      })
      .catch((error) => {
        console.log(error);
        
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
  };

  return (
    <div className="p-4 mx-12">
      <ToastContainer />
      <Typography
        variant="h4"
        className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500  text-center uppercase tracking-wide my-4 mb-8"
      >
        ✨ Course List ✨
      </Typography>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <CourseCard
            key={course.id}
            course={course}
            onEnroll={handleEnroll}
            isEnrolled={true}
          />
          ))}
          {courses.map((course) => (
            <CourseCard
            key={course.id}
            course={course}
            onEnroll={handleEnroll}
            isEnrolled={false}
          />
          ))}
        </div>
      )}
    </div>
  );
};

export default Course;
