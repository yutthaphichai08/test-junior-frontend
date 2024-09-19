// auth.ts
export const checkLoggedInStatus = (): boolean => {
  if (typeof window !== "undefined") {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    return loggedIn === "true";
  }
  return false;
};
