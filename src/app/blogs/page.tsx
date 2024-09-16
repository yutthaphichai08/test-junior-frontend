"use client";

import { useEffect, useState } from "react";
import User from "@/service/api/User";

interface IUser {
  id: number;
  name: string;
  description: string;
}

export default function Blogs() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      fetchUsers();
    } else {
      const redirectTimeout = setTimeout(() => {
        window.location.href = "/";
      }, 0);

      return () => clearTimeout(redirectTimeout);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const userData = await User.getAll();
      // console.log(userData.data);
      setUsers(userData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        {isLoggedIn ? (
          <>
            <h1>Welcome to the blogs page!</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">name</th>
                  <th scope="col">description</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Redirecting to login...</p>
        )}
      </div>
    </>
  );
}
