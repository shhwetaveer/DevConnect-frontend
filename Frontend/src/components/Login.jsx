import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Form, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            const res = await axios.post(
                BASE_URL+"/login",
                { emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data)); //add data into redux store
            return navigate("/")
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    const handleSignUp = async () => {

        try {
            const res = await axios.post(
                BASE_URL +"/signup",
                { emailId, password, firstName, lastName },
                { withCredentials: true }
            );
            console.log(res.data);
            dispatch(addUser(res.data.data));
            navigate("/profile");

        }
        catch(err){
             setError(err?.response?.data || "Something went wrong");
        }
    }

    return <div className="flex justify-center my-15">
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                <div>
                    {!isLoginForm && <><fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">First Name:</legend>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Last Name:</legend>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                            className="input" placeholder="Type here" />
                    </fieldset></>}
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Email ID</legend>
                        <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)}
                            className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="input" placeholder="Type here" />
                    </fieldset>
                </div>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center m-2">
                    <button className="btn btn-primary" 
                    onClick={isLoginForm ? handleLogin : handleSignUp}>
                        {isLoginForm ? "Login" : "Sign Up"}</button>
                </div>
                <p className="text-center mt-2 cursor-pointer" onClick={() =>setIsLoginForm((value)=> !value)}>
                    {isLoginForm ?"Don't have an account? Sign Up" : "Already have an account? Login"}</p>
            </div>
        </div></div>
};

export default Login;