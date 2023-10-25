"use client";

import { useState, useEffect } from "react";
import PollifyCardGrid from "@/components/poll/PollifyCardGrid";
import ConductedPollGrid from "@/components/poll/ConductedPollGrid";
import { useSession } from "next-auth/react";

function PollDashboard() {
  const [pollifyPolls, setPollifyPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/polls")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((polls) => {
        setPollifyPolls(polls.data);
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

  useEffect(() => {
    fetch(`/api/users/${session?.user?.id}`)
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
  }, [session]);

  if (isLoading) {
    return <div>Laster inn...</div>;
  }

  return (
    <div>
      {pollifyPolls.length > 0 ? (
        <PollifyCardGrid data={pollifyPolls} title={"Pollify Community"} />
      ) : (
        <div className="py-4">Det finnes ingen poll i Pollify Community.</div>
      )}
    </div>
  );
}

export default PollDashboard;
