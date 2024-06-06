import AddFriend from "./AddFriend";

const User = (props) => {
  return (
    <article key={props.user._id}>
        {props.user.fullName} <br/>
        {props.user.email}
        <AddFriend user={props.user} />
    </article>
  );
};

export default User;
