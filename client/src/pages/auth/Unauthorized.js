import React from "react";
import useAuth from "../../hooks/useAuth";

function Unauthorized() {
  const { auth } = useAuth();
  return (
    <div>
      <h2>You are not authorised for this page</h2>
      <div>
        <h4>
          This page is only visible to{" "}
          {auth.ROLE[0] == "admin" ? "Users" : "Admin"}
        </h4>
      </div>
    </div>
  );
}

export default Unauthorized;
