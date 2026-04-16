import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';
import axios from 'axios';

const Request = () => {

    const requests = useSelector((state) => state.requests);
    const dispatch = useDispatch();

    const reviewRequest = async(status, _id) => {
        try{
            const res = await axios.post(
                BASE_URL + "/review/"+ status + "/" + _id,
                {},
                {withCredentials: true}
            );
            dispatch(removeRequest(_id));
        }catch(err){
            console.log(err);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/request/recieved", {
                withCredentials: true,
            });
            dispatch(addRequest(res.data.data));
        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        fetchRequests();
    }, []);
    if (!requests) return;

    if (requests.length === 0) return <h1 className="text-center my-10">No Requests Found</h1>

    return (
        <div className=" text-center my-10">
            <h1 className="text-3xl text-white font-bold">Requests</h1>

            {requests.map((request) => {
                const { _id, firstName, lastName, photoURL, age, gender, skills } = request;
                return (
                    <div key={_id}
                        className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
                        <div>
                            <img alt='photo'
                                className="w-20 h-20 rounded-full"
                                src={photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR6bhMxYmN54ydUVb4gTLT585jqUvcl3CM0A&s"} />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                        </div>
                        <div>
                            <button className="btn btn-outline btn-primary"
                            onClick={() => reviewRequest("rejected",request._id)}>Reject</button>
                            
                            <button className="btn btn-outline btn-secondary"
                            onClick={() => reviewRequest("accepted",request._id)}>Accept</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Request;