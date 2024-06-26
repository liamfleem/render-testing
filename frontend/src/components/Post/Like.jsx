import { changeLike } from "../../services/posts";

const Like = (props) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  // let liked = props.post.like_array.includes(user_id);

  const likePost = () => {
    // liked = !liked;
    changeLike(token, props.post._id, user_id, !props.value)
    .catch((err) => {console.error(err)});
    console.log("Like props is:", props)
    props.update(!props.value);
  };

  return (
    <div>
      {!props.value && <button onClick={likePost}>Like</button>}
      {props.value && <button onClick={likePost}>Unlike</button>}
    </div>
  );
};

export default Like;
