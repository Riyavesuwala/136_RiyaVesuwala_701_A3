import React, { useState, useEffect } from "react";

const API = "http://localhost:4000/items";

export default function CrudFront() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(null);

  const fetchItems = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const createItem = async () => {
    if (!title.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const startEdit = (item) => {
    setEditing(item);
    setTitle(item.title);
  };

  const updateItem = async () => {
    await fetch(`${API}/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setEditing(null);
    setTitle("");
    fetchItems();
  };

  return (
    <div>
      <h2>CRUD Frontend (talks to Express)</h2>

      <div className="input-group mb-3">
        <input className="form-control" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <button className="btn btn-primary" onClick={editing ? updateItem : createItem}>
          {editing ? "Update" : "Create"}
        </button>
        {editing && <button className="btn btn-secondary ms-2" onClick={() => { setEditing(null); setTitle(""); }}>Cancel</button>}
      </div>

      <ul className="list-group">
        {items.map(it => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={it.id}>
            <span>{it.title}</span>
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>startEdit(it)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteItem(it.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
