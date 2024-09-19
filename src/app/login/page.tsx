"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

interface ILoginForm {
  username: string;
  password: string;
}
export default function Login() {
  const [formData, setFormData] = useState<ILoginForm>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const validUser = process.env.NEXT_PUBLIC_VALID_USER || "";
  const validPassword = process.env.NEXT_PUBLIC_VALID_PASSWORD || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ตรวจสอบข้อมูลที่ป้อน
    if (
      formData.username === validUser &&
      formData.password === validPassword
    ) {
      sessionStorage.setItem("isLoggedIn", "true");
      Swal.fire({
        title: "Login Successful",
        text: "Redirecting to your website...",
        icon: "success",
      }).then(() => {
        window.location.href = "/blogs";
      });
      setError(null); // ล้างข้อความ error
    } else {
      Swal.fire({
        title: "Login False",
        text: "Invalid username or password",
        icon: "error",
      });
      setError("Invalid username or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-3">
        <div className="card">
          <div className="card-header text-center">
            <h4>Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
