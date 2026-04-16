import EditProfile from "./EditProfile";
import { useSelector } from 'react-redux';

const Profile = () => {

    const user = useSelector((state) => state.user);

    return (user && (<div>
         <EditProfile user={user} />
    </div> ));
};

export default Profile;