import ShowComments from "../Comment/ShowComments";
import CommentButton from "../Comment/CommentButton";
import Like from "./Like";
import { useState } from "react";

const Post = (props) => {
  const user_id = localStorage.getItem("user_id");
  const [isLiked, setLiked] = useState(props.post.like_array.includes(user_id));
  
  return (
    <article /*key={props.post._id}*/>
      {console.log("props is:", props)}
      {props.post.message}    Likes: {props.post.like_array.length} Posted by: {props.post.author_id}
      <Like post={props.post} value={isLiked} update={setLiked}/>
      <CommentButton parent={props.post._id} /*value={props.value} update={props.update}*/ />
      <ShowComments parent={props.post._id} /*value={props.value} update={props.update}*/ />
    </article>
  );
};

export default Post;
