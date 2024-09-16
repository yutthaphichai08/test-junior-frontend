"use client";

import { useEffect, useState } from "react";
import User from "@/service/api/User";

interface IUser {
  id: number;
  name: string;
  detail: string;
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
      <div>
        {isLoggedIn ? (
          <>
            <p>Welcome to the blogs page!</p>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name}-{user.detail}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Redirecting to login...</p>
        )}
      </div>
    </>
  );
}
