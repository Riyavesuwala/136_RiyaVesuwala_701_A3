import React, { useState, useEffect } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id); // cleanup
  }, []);

  const pad = (n) => n.toString().padStart(2, "0");
  const hours = pad(time.getHours());
  const mins = pad(time.getMinutes());
  const secs = pad(time.getSeconds());

  return (
    <div>
      <h2>Digital Clock</h2>
      <div className="display-6">
        {hours}:{mins}:{secs}
      </div>
    </div>
  );
}
