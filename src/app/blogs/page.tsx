"use client";

import { useEffect, useState } from "react";
import User from "@/service/api/User";

import PaginationComponent from "../components/PaginationComponent";
import SearchComponent from "../components/SearchComponent";
import CardComponent from "../components/CardComponent";
import LoadingSpinner from "../components/LoadingSpinner";
import { checkLoggedInStatus } from "@/app/auth/auth";
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const status = checkLoggedInStatus();
    if (status) {
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
      const blogData = await User.getAll();
      setBlogs(blogData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    <div
      className={"container"}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        {loading ? (
          <LoadingSpinner />
        ) : isLoggedIn ? (
          <>
            <div className="p-5">
              <h1 className="text-center">Welcome to the web site!</h1>
            </div>
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
                    key={item.id}
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
        {filteredUsers.length > 0 && (
          <div
            style={{
              marginTop: "auto",
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
        )}
      </div>
    </div>
  );
}
