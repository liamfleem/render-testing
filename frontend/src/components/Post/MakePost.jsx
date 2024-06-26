import { useState } from "react";
import { makePost } from "../../services/posts";

const MakePost = (props) => {
    const [postData, setPostData] = useState("");
    const dateTimeString = new Date()
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        try {
            await makePost(token, postData, dateTimeString, props.parent, user_id)
            .then((newPost) => {
                props.update(newPost.concat(props.value))
            });
            setPostData("");
        } catch (err) {
            console.error(err);
        }
    };

    const handlePostChange = (event) => {
        setPostData(event.target.value);
    };

    return (
        <>
        <div id="make-post">
            <form onSubmit={handleSubmit}>
                <label htmlFor="new-post">
                Write a post!
                </label>
                <textarea
                id="new-post"
                type="text"
                value={postData}
                onChange={handlePostChange}
                />
                <input role="submit-button" id="submit" type="submit" value="Post" />
            </form>
        </div>
        </>
    )
}

export default MakePost;
