"use client";

import { useState, useEffect } from "react";
import PollifyCardGrid from "@/components/poll/PollifyCardGrid";
import ConductedPollGrid from "@/components/poll/ConductedPollGrid";
import MyPollGrid from "@/components/poll/MyPollGrid";
import { useSession } from "next-auth/react";

function PollDashboard() {
  const [myPolls, setMyPolls] = useState([]);
  const [conductedPolls, setConductedPolls] = useState([]);
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

      {myPolls.length > 0 ? (
        <MyPollGrid data={myPolls} title={"Mine Poll"} />
      ) : (
        <div className="py-4">
          <h2 className="pb-4 text-xl font-semibold">Mine Poll</h2>
          <p>Du har ikke laget noen poll ennå.</p>
        </div>
      )}

      {conductedPolls.length > 0 ? (
        <ConductedPollGrid data={conductedPolls} title={"Gjennomførte Poll"} />
      ) : (
          <div className="py-4">
          <h2 className="pb-4 text-xl font-semibold">Gjennomførte Poll</h2>
          <p>Du har ingen gjennomførte poll.</p>
        </div>
      )}
    </div>
  );
}

export default PollDashboard;
