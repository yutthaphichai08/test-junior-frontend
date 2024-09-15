"use client";

import React, { useState } from "react";

interface ILoginForm {
  username: string;
  password: string;
}
export default function Home() {
  const [formData, setFormData] = useState<ILoginForm>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // เพิ่มการเชื่อมต่อกับ backend หรือตรวจสอบข้อมูลตรงนี้
    console.log("Username:", formData.username);
    console.log("Password:", formData.password);
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
