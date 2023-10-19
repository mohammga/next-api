"use client";

import { useState, useEffect } from 'react';
import CardGrid from "@/components/poll/CardGrid";

function PollDashboard() {
  const [myPolls, setMyPolls] = useState([]);
  const [completedPolls, setCompletedPolls] = useState([]);

  useEffect(() => {
    // Fetch my polls from the API
    fetch('/api/poll')  // Adjust the URL if your endpoint is different
      .then(response => response.json())
      .then(data => setMyPolls(data));
  }, []);

  return (
    <div>
      <CardGrid data={myPolls.map(poll => poll)} title={"Pollify Samfunnet"} />
      <CardGrid data={myPolls.map(poll => poll)} title={"Mine Poll"} />
      <CardGrid data={myPolls.map(poll => poll)} title={"Gjennomførte Poll"} />
    </div>
  );
}

export default PollDashboard;
