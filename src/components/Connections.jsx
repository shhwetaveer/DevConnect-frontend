import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { useSelector } from 'react-redux';


const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connections);
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/connections", {
                withCredentials: true,
            });
            dispatch(addConnection(res.data.data));
        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0) return <h1 className="text-center my-10">No Connections Found</h1>

    return (
        <div className=" text-center my-10">
            <h1 className="text-3xl text-white font-bold">Connections</h1>

            {connections.map((connection) => {
                const {_id, firstName, lastName, photoURL, age, gender, skills } = connection;
                return (
                    <div key={_id} 
                    className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                        <div>
                            <img alt='photo'
                                className="w-20 h-20 rounded-full"
                                src={photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR6bhMxYmN54ydUVb4gTLT585jqUvcl3CM0A&s"} />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                        </div>

                    </div>
                );
            })}
        </div>
    );
};

export default Connections;