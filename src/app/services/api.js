const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editUser = async (id, user) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
