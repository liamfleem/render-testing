import { useState } from "react";
import { makePost } from "../services/posts";
const MakePost = (props) => {
    const [postData, setPostData] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await makePost(token, postData);
            props.update(!props.value);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePostChange = (event) => {
        setPostData(event.target.value);
    };
    
    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor = "new-post">
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