const PATH_NAME = "users";

const getAll = async () => {
  const url = `http://localhost:3000/api/${PATH_NAME}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const res = await response.json();
  return res || [];
};

const getDetail = async (id: number) => {
  const url = `http://localhost:3000/api/${PATH_NAME}/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const res = await response.json();
  return res || null;
};

const User = {
  getAll,
  getDetail,
};

export default User;
