import React from 'react';
import {
    Button,
    Card,
    Typography,
  } from "@material-tailwind/react"; 

const EnrollmentCard = ({ enroll, onEnroll }) => {
  return (
    <Card
      key={enroll.id}
      className="p-6 flex h-48 flex-col items-start space-y-4 shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <Typography variant="h5" className="font-semibold text-gray-800">
        {enroll.Course.name}
      </Typography>
      <Typography className="text-gray-600">
        {enroll.Course.description}
      </Typography>
      <Button
  
        onClick={() => onEnroll(enroll.id)}
        className={`mt-auto w-full bg-orange-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all hover:shadow-xl cursor-pointer`}
      >
       Unenroll
      </Button>
    </Card>
  );
};

export default EnrollmentCard;