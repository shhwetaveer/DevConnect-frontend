import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";


const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);

    const fetchUser = async () => {
        if (userData) return;

        try {
            const res = await axios.get(
                BASE_URL + "/profile/view",
                { withCredentials: true }
            );

            dispatch(addUser(res.data.data));

        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login");
            } else {
                console.error("Unexpected error:", err);
            }
        }
    };


    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Body;