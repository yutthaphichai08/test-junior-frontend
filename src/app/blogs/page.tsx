"use client";

import { useEffect, useState } from "react";
import User from "@/service/api/User";
import styles from "@/style/Card.module.css";
import PaginationComponent from "../components/PaginationComponent";
import SearchComponent from "../components/SearchComponent";

interface IUser {
  id: number;
  name: string;
  description: string;
  image: string;
}

const PAGE_SIZE = 6; // Number of users per page

export default function Blogs() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      setUsers(userData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = (id: number) => {
    window.location.href = `/blogs/${id}`;
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term.toLowerCase());
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Filter and paginate users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.description.toLowerCase().includes(searchTerm)
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  return (
    <div className={` container mt-5`}>
      <div>
        {isLoggedIn ? (
          <>
            <h1 className="mb-4">Welcome to the blogs page!</h1>
            <SearchComponent
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
            {filteredUsers.length === 0 ? (
              <div className="text-center">
                <p>No results found for your search.</p>
              </div>
            ) : (
              <>
                <div className="row">
                  {paginatedUsers.map((user) => (
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
            )}
          </>
        ) : (
          <p>Redirecting to login...</p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0px",
        }}
      >
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
