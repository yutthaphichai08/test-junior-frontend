"use client";

import { useEffect, useState } from "react";
import User from "@/service/api/User";
import styles from "@/style/Card.module.css";

interface IUser {
  id: number;
  name: string;
  description: string;
  image: string;
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

  const handleCardClick = (id: number) => {
    window.location.href = `/blogs/${id}`;
  };

  return (
    <div className="container mt-5">
      {isLoggedIn ? (
        <>
          <h1 className="mb-4">Welcome to the blogs page!</h1>
          <div className="row">
            {users.map((user) => (
              <div
                className="col-md-4 mb-3 d-flex"
                key={user.id}
                onClick={() => handleCardClick(user.id)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={`${styles.card} card d-flex flex-column`}
                  style={{ height: "100%" }}
                >
                  <img
                    src={
                      user.image ??
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                    }
                    className={`${styles.cardImage} card-img-top img-fluid`}
                    alt={user.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className={`${styles.cardTitle} card-title`}>
                      {user.name}
                    </h5>
                    <p
                      className={`${styles.cardText} card-text`}
                      style={{
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {user.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
}
