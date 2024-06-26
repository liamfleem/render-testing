import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/users";
import { ProfileUpdate } from "../../components/Profile/ProfileUpdate";
import FriendRequest from "./FriendRequests";

export const ProfilePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const profile = useParams();
    const user_id = localStorage.getItem("user_id");
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserById(token, profile.user_id)
                .then((data) => {
                    setUser(data.user);
                    localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
        }
    }, [navigate, profile ]);

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    return (
        <>
            <h1>{user.fullName}</h1>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>
            {(user_id == profile.user_id) && <ProfileUpdate profile={user} setProfile={setUser} />}
            {(user_id == profile.user_id) && <p>Friend Requests: </p>}
            {(user_id == profile.user_id) && user.friend_req &&
                user.friend_req.map((req) => <FriendRequest key={req} requester={req} />)
            }
        </>
    );
};
