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
      setEmailError(""); 
    },
  });
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Invalid email format. Please enter a valid email.");
      return;
    }
    setEmailError(""); 
    addUser({ variables: { name, email } });
  };

  return (
    <div className="d-flex mx-auto flex-column justify-content-center align-items-center mt-5">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="name" className="form-label ">
          Name
        <input
        className="form-control"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </label>
        </div>
        
        <div>
        <label htmlFor="email" className="form-label ">
        Email
        <input
        className="form-control"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </label>
        </div>
     
     <div className="d-flex  mx-4 "> 
      
        <button className="btn btn-primary  "  type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
     </div>
      </form>
    </div>
  );
};

export default AddUserForm;
