import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function RoleSelection() {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    axiosClient.post("/user/role", { role }) // Adjust the endpoint as needed
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        navigate("/details"); // Redirect to details page
      })
      .catch((error) => {
        console.error("Error selecting role:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Select Your Role</h1>
      <div className="mt-4">
        <button onClick={() => handleRoleSelection("candidate")} className="btn">Candidate</button>
        <button onClick={() => handleRoleSelection("worker")} className="btn">Worker</button>
      </div>
    </div>
  );
}
