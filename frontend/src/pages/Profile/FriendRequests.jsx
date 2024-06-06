import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../../services/users";

const FriendRequest = (props) => {
    const [user, setUser] = useState({})
    console.log("Rendered")
    useEffect(() => {
        const token = localStorage.getItem("token");
        getUserById(token, props.requester)
            .then((data) => {
                setUser(data.user);
            });
    }, []);

    return (
        <div>
            <Link to={`/profile/${user._id}`}>{user.fullName}</Link>
            <br />
        </div>
    );
};

export default FriendRequest;