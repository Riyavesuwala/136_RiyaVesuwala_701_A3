import React, { useState } from "react";

function validateEmail(email) {
  // simple regex (for demo only)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LiveValidation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValid = validateEmail(email);
  const passwordStrong = password.length >= 6;

  const canSubmit = emailValid && passwordStrong;

  return (
    <div>
      <h2>Live Validation</h2>
      <div className="mb-3">
        <label>Email</label>
        <input className={`form-control ${email ? (emailValid ? "is-valid" : "is-invalid") : ""}`}
               value={email} onChange={(e)=>setEmail(e.target.value)} />
        <div className="invalid-feedback">Enter a valid email</div>
      </div>

      <div className="mb-3">
        <label>Password (min 6 chars)</label>
        <input type="password" className={`form-control ${password ? (passwordStrong ? "is-valid" : "is-invalid") : ""}`}
               value={password} onChange={(e)=>setPassword(e.target.value)} />
        <div className="invalid-feedback">Password too short</div>
      </div>

      <button className="btn btn-success" disabled={!canSubmit}>Submit</button>
      <div className="mt-3">
        <strong>Live status:</strong> {canSubmit ? "All good" : "Fix errors"}
      </div>
    </div>
  );
}
