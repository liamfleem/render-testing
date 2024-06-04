const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserById = async (token, user_id) => {
    // const payload = {
    //     user_id: user_id
    // };
    const requestOptions = {
        method: "GET",
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // user_id: user_id,
        },
        // body: JSON.stringify(payload)
    };

    const response = await fetch(`${BACKEND_URL}/users/${user_id}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch user");
    }

    console.log(`user_id is:${user_id}`);
    const data = await response.json();
    console.log("data is:", data);
    return data;
};


// WIP

// Jack additions
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
  
    let response = await fetch(`${BACKEND_URL}/users/${user_id}`, requestOptions);
  
    // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
    if (response.status === 200) {
      return;
    } else {
      throw new Error("Unable to send Friend Request");
    }
};