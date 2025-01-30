import React from 'react';
import {
    Button,
    Card,
    Typography,
  } from "@material-tailwind/react"; 

const CourseCard = ({ course, onEnroll, isEnrolled }) => {
  return (
    <Card
      key={course.id}
      className="p-6 flex h-48 flex-col items-start space-y-4 shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <Typography variant="h5" className="font-semibold text-gray-800">
        {course.name}
      </Typography>
      <Typography className="text-gray-600">
        {course.description}
      </Typography>
      <Button
        disabled={isEnrolled}
        onClick={() => !isEnrolled && onEnroll(course.id)}
        className={`mt-auto w-full ${
          isEnrolled ? 'bg-gray-500 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all hover:shadow-xl cursor-pointer`}
      >
        {isEnrolled ? 'Enrolled' : 'Enroll Now'}
      </Button>
    </Card>
  );
};

export default CourseCard;