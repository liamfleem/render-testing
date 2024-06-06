import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/users";
import User from "../../components/User/User";

export const UserSearch = () => {
	const [searchData, setSearchData] = useState("");
	const [users, setUsers] = useState([]);
	const [sortedUsers, setSortedUsers] = useState([]);
	const navigate = useNavigate();
	const user_id = localStorage.getItem("user_id");

	const token = localStorage.getItem("token");
	if (token && users.length == 0) {
		getUsers(token)
			.then((data) => {
			setUsers(data.users);
			localStorage.setItem("token", data.token);
			})
			.catch((err) => {
			console.error(err);
			navigate("/login");
			});
	}

	useEffect(() => {
		if (searchData === "" || searchData === " ") {
			setSortedUsers([])
		} else {
			setSortedUsers(users.filter((u) => u.fullName.includes(searchData) && u._id != user_id))
		}
	}, [searchData]);

    return (
        <div>
			<input
				type="text"
				placeholder="Search users"
				value={searchData}
				onChange={(e) => setSearchData(e.target.value)}
			/>
			{sortedUsers.map((user) =>
				<User user={user} key={user._id}/>
			)}
		</div>
    );
};
