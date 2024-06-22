import React, { useEffect, useState } from "react";
import { StudentDashboard } from "../../components/Layouts/Student/StudentDashboard";
import { useSelector } from "react-redux";
import { ModalCheck } from "../../components/Modal/ModalCheck";

export const Home = () => {
  const user = useSelector((state) => state?.user?.user?.currentUser);
  const [isCheck, setIsCheck] = useState(false);
  const handleClose = () => {
    setIsCheck(false);
  };
  useEffect(() => {
    if (user?.dateJoined === null || user?.dateJoined === "N/A") {
      setIsCheck(true);
    }
  }, [user]);
  return (
    <>
      <StudentDashboard />
      {isCheck && <ModalCheck isOpen={isCheck} onClose={handleClose} />}
    </>
  );
};
