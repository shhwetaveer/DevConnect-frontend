import React, { useState } from 'react'
import UserCards from './UserCards';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [age, setAge] = useState(user.age || "");
    const [photoURL, setPhotoURL] = useState(user.photoURL || "");
    const [gender, setGender] = useState(user.gender || "");
    const [skills, setSkills] = useState(user.skills || "");
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");

        if (!gender) {
            setError("Please select gender");
            return;
        }

        const payload = {
            firstName,
            lastName,
            age: Number(age),
            photoURL,
            gender,
            skills
        };

        console.log("SENDING:", payload);

        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                payload,
                { withCredentials: true }
            );

            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            console.log("Toast triggered");


        } catch (err) {
            console.log("FULL ERROR:", err);
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
            console.log("MESSAGE:", err.message);
            setError(err.response?.data?.message || "Something went wrong");
        }

    };


    return (
        <>
            <div className="min-h-screen bg-base-200 py-10 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

                    {/* EDIT FORM */}
                    <div className="card bg-base-100 shadow-xl rounded-2xl">
                        <div className="card-body space-y-3">
                            <h2 className="card-title justify-center text-2xl font-bold">
                                Edit Profile
                            </h2>

                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="input input-bordered w-full"
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="input input-bordered w-full"
                            />

                            <input
                                type="text"
                                placeholder="Photo URL"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="input input-bordered w-full"
                            />

                            <input
                                type="number"
                                placeholder="Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="input input-bordered w-full"
                            />

                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Skills (comma separated)"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className="input input-bordered w-full"
                            />

                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}

                            <button
                                className="btn btn-primary w-full mt-2"
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>

                    {/* PREVIEW CARD */}
                    <div className="flex justify-center">
                        <UserCards
                            user={{ firstName, lastName, age, photoURL, gender, skills }}
                        />
                    </div>

                </div>
            </div>

            {/* TOAST */}
            {showToast && (
                <div className="toast toast-top toast-end z-50">
                    <div className="alert alert-success shadow-lg">
                        <span>Profile Saved Successfully 🎉</span>
                    </div>
                </div>
            )}
        </>
    );

}

export default EditProfile;