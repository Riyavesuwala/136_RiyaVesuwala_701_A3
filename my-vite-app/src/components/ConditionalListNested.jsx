import React from "react";

// Nested child component
function PersonCard({ person }) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{person.name}</h5>
        <p className="card-text">Age: {person.age}</p>
      </div>
    </div>
  );
}

// Component demonstrating children/containment
function Container({ title, children }) {
  return (
    <div className="border p-3 mb-3">
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

export default function ConditionalListNested() {
  const showList = true; // change to false to test conditional rendering
  const people = [
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 29 },
    { id: 3, name: "Carol", age: 22 }
  ];

  return (
    <div>
      <h2>Conditional Rendering & Lists</h2>

      {/* conditional rendering */}
      {showList ? (
        <Container title="People list (children used inside)">
          {people.map(p => (
            <PersonCard key={p.id} person={p} />
          ))}
        </Container>
      ) : (
        <div className="alert alert-warning">List is hidden. Toggle `showList` to true.</div>
      )}
    </div>
  );
}
