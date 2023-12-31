"use client";

import { useState, useEffect } from "react";
import PollifyCardGrid from "@/components/grid/PollifyCardGrid";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Pollify() {
  const [pollifyPolls, setPollifyPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const handleCreate = () => {
    router.push("/poll/new");
  };

  if (isLoading) {
    return <p className="py-4">Laster inn...</p>;
  }

  return (
    <>
      {pollifyPolls.length > 0 ? (
        <PollifyCardGrid data={pollifyPolls} title={"Pollify Community"} />
      ) : (
        <div className="py-4">
          <h2 className="pb-2 text-xl font-semibold">Pollify Community</h2>
          <p className="pb-2 text-muted-foreground">
            Det ser ut til at det ikke finnes noen poll i Pollify Community ennå
            eller du har gjennomført alle pollene.
          </p>

          <Button onClick={handleCreate}>Opprett en poll</Button>
        </div>
      )}
    </>
  );
}

export default Pollify;
