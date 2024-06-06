// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const getUserById = async (token, user_id) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${user_id}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch user");
    }

    const data = await response.json();
    return data;
};


export const updateUserProfile = async (token, email, fullName, bio, user_id) => {
    const payload = {
        email: email,
        fullName: fullName,
        bio: bio
    };

    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/users/${user_id}`, requestOptions);

    if (response.status === 200) {
        return response;
    } else {
        throw new Error("Unable to update user profile");
    }
};


export const getUsers = async (token) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);
  
    if (response.status !== 200) {
      throw new Error("Unable to fetch users");
    }
  
    const data = await response.json();
    return data;
};


export const sendFriendReq = async (token, sender_id, user_id, add) => {
    const payload = {
      sender: sender_id,
      recipient: user_id,
      adding: add
    };
  
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    };
  
    let response = await fetch(`${BACKEND_URL}/users/befriend/${user_id}`, requestOptions);
  
    // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
    if (response.status === 200) {
      return;
    } else {
      throw new Error("Unable to send Friend Request");
    }
};
