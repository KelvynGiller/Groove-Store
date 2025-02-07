import React from "react";
import { logout } from "../../services/authService";

const LogoutButton = () => {
  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;