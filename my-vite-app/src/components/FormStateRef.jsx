import React, { useState, useRef } from "react";

export default function FormStateRef() {
  const [username, setUsername] = useState("");
  const ageRef = useRef(); // uncontrolled input

  const handleSubmit = (e) => {
    e.preventDefault();
    const age = ageRef.current.value;
    alert(`username: ${username}, age: ${age}`);
    // clear
    setUsername("");
    ageRef.current.value = "";
  };

  return (
    <div>
      <h2>Form with useState and useRef</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username (controlled)</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <label>Age (uncontrolled with ref)</label>
          <input className="form-control" ref={ageRef} placeholder="Enter age"/>
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}
