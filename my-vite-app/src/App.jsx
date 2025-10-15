import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import ConditionalListNested from "./components/ConditionalListNested";
import FormStateRef from "./components/FormStateRef";
import DigitalClock from "./components/DigitalClock";
import LiveValidation from "./components/LiveValidation";
import LiveFilter from "./components/LiveFilter";
import CrudFront from "./components/CrudFront";

export default function App() {
  return (
    <div className="container py-4">
      <nav className="mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/conditional">Conditional & List</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/form-state-ref">Forms (useState/useRef)</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/clock">Digital Clock</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/live-validation">Live Validation</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/live-filter">Live Filter</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/crud">CRUD Frontend</NavLink></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conditional" element={<ConditionalListNested />} />
        <Route path="/form-state-ref" element={<FormStateRef />} />
        <Route path="/clock" element={<DigitalClock />} />
        <Route path="/live-validation" element={<LiveValidation />} />
        <Route path="/live-filter" element={<LiveFilter />} />
        <Route path="/crud" element={<CrudFront />} />
      </Routes>
    </div>
  );
}
