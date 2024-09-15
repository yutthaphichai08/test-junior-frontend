"use client";

import { useEffect, useState } from "react";

export default function () {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      const redirectTimeout = setTimeout(() => {
        window.location.href = "/";
      }, 0);

      return () => clearTimeout(redirectTimeout);
    }
  }, []);
  return (
    <>
      <div>
        {isLoggedIn ? (
          <p>Welcome to the blogs page!</p>
        ) : (
          <p>Redirecting to login...</p>
        )}
      </div>
    </>
  );
}
