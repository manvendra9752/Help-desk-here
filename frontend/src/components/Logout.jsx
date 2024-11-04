import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
    navigate("/login");
    toast.success("Successfully logged out!");

    window.location.reload();
  }, [dispatch, navigate]);

  return <>{null}</>;
};

export default Logout;
