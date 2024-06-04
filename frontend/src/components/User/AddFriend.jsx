import { useState } from "react";
import { sendFriendReq } from "../../services/users";

const AddFriend = (props) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const [frSent, setFR] = useState(props.user.friend_req.includes(user_id))

  const FRpressed = () => {
    setFR(!frSent);
    sendFriendReq(token, user_id, props.user._id, !frSent);
  };

  return (
    <div>
      {!frSent && <button onClick={FRpressed}>Send Friend request</button>}
      {frSent && <button onClick={FRpressed}>Unsend Friend request</button>}
    </div>
  );
};

export default AddFriend;
