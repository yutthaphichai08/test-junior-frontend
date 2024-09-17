"use client";

import { useEffect, useState } from "react";
import User from "@/service/api/User";
import styles from "@/style/Card.module.css";
import PaginationComponent from "../components/PaginationComponent";
import SearchComponent from "../components/SearchComponent";
import CardComponent from "../components/CardComponent";

interface IBlogs {
  id: number;
  name: string;
  description: string;
  image: string;
}

const PAGE_SIZE = 6; // Number of users per page

export default function Blogs() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<IBlogs[]>([]);
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
      setBlogs(userData.data);
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
  const filteredUsers = blogs.filter(
    (blog) =>
      blog.name.toLowerCase().includes(searchTerm) ||
      blog.description.toLowerCase().includes(searchTerm)
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
              <div className="row">
                {paginatedUsers.map((item) => (
                  <CardComponent
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    onClick={() => handleCardClick(item.id)}
                  />
                ))}
              </div>
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
