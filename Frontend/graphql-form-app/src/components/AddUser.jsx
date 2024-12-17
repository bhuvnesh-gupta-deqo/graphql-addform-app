import  { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, GET_USERS } from "../graphql/queries";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      setName("");
      setEmail("");
      setEmailError(""); // Clear validation errors
    },
  });

  // Email Validation Function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email regex
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation before form submission
    if (!validateEmail(email)) {
      setEmailError("Invalid email format. Please enter a valid email.");
      return;
    }

    setEmailError(""); // Clear error if valid
    addUser({ variables: { name, email } });
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddUserForm;
