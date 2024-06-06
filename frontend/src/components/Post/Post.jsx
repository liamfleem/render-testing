import ShowComments from "../Comment/ShowComments";
import CommentButton from "../Comment/CommentButton";
import Like from "./Like";
import { useState, useEffect } from "react";
import { getUserById } from "../../services/users";

const Post = (props) => {
  const user_id = localStorage.getItem("user_id");
  const [author, setAuthor] = useState("");
  const [isLiked, setLiked] = useState(props.post.like_array.includes(user_id));
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    getUserById(token, props.post.author_id)
      .then((data) => {setAuthor(data.user.fullName)} );
  }, []);

  return (
    <article>
      {props.post.message}    Likes: {props.post.like_array.length} Posted by: {author}
      <Like post={props.post} value={isLiked} update={setLiked}/>
      <CommentButton parent={props.post._id} /*value={props.value} update={props.update}*/ />
      <ShowComments parent={props.post._id} /*value={props.value} update={props.update}*/ />
    </article>
  );
};

export default Post;
