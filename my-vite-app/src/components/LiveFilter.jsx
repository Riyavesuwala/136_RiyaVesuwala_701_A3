import React, { useState } from "react";

export default function LiveFilter() {
  const [query, setQuery] = useState("");
  const data = [
    "Apple", "Banana", "Orange", "Mango", "Pineapple",
    "Grapes", "Watermelon", "Cherry", "Blueberry"
  ];

  const filtered = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h2>Live Data Filtering</h2>
      <input className="form-control mb-3" placeholder="Type to filter"
             value={query} onChange={e => setQuery(e.target.value)} />
      <ul className="list-group">
        {filtered.map((item, idx) => <li key={idx} className="list-group-item">{item}</li>)}
        {filtered.length === 0 && <li className="list-group-item text-muted">No results</li>}
      </ul>
    </div>
  );
}
