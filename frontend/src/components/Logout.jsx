import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
    toast.success("Successfully logged out!");
    navigate("/login");
    window.location.reload();
  }, [dispatch, navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {null}
    </>
  );
};

export default Logout;
