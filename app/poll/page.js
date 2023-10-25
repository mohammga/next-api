"use client";

import { useState, useEffect } from "react";
import PollifyCardGrid from "@/components/poll/PollifyCardGrid";
import ConductedPollGrid from "@/components/poll/ConductedPollGrid";
import MyPollGrid from "@/components/poll/MyPollGrid";

function PollDashboard() {
  const [myPolls, setMyPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetch("/api/polls")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((polls) => {
        setMyPolls(polls.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Laster inn...</div>;
  }

  return (
    <div>
      <PollifyCardGrid
        data={myPolls.map((poll) => poll)}
        title={"Pollify Samfunnet"}
      />
      <MyPollGrid data={myPolls.map((poll) => poll)} title={"Mine Poll"} />
      <ConductedPollGrid
        data={myPolls.map((poll) => poll)}
        title={"Gjennomførte Poll"}
      />
    </div>
  );
}
export default PollDashboard;
