import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Leave() {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [grant, setGrant] = useState("No");
  const [leaves, setLeaves] = useState([]);

  const token = localStorage.getItem("token");

  const fetchLeaves = async () => {
    const res = await axios.get("http://localhost:4000/leave", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLeaves(res.data);
  };

  useEffect(() => { fetchLeaves(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/leave",
      { date, reason, grant },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDate(""); setReason(""); setGrant("No");
    fetchLeaves();
  };

  return (
    <div>
      <h2>Leave Application</h2>
      <form className="mb-3" onSubmit={handleSubmit}>
        <input type="date" className="form-control mb-2" value={date} onChange={e => setDate(e.target.value)} required />
        <input type="text" className="form-control mb-2" placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} required />
        <select className="form-select mb-2" value={grant} onChange={e => setGrant(e.target.value)}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        <button className="btn btn-primary">Apply</button>
      </form>

      <h4>Leaves List</h4>
      <ul className="list-group">
        {leaves.map(l => (
          <li key={l._id} className="list-group-item">
            {new Date(l.date).toLocaleDateString()} - {l.reason} - <strong>{l.grant}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
