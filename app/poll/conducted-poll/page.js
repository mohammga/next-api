"use client";

import { useState, useEffect } from "react";
import ConductedPollGrid from "@/components/poll/ConductedPollGrid";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

function ConductedPollPage() {
  const [conductedPolls, setConductedPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

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

  const handleStart = () => {
    router.push("/poll");
  };

  if (isLoading) {
    return <div>Laster inn...</div>;
  }

  return (
    <div>
      {conductedPolls.length > 0 ? (
        <ConductedPollGrid data={conductedPolls} title={"Gjennomførte Poll"} />
      ) : (
        <div className="py-4">
          <h2 className="pb-4 text-xl font-semibold">Gjennomførte Poll</h2>
          <p>Du har ingen gjennomførte poll.</p>
          <Button onClick={handleStart}>Ta en poll</Button>
        </div>
      )}
    </div>
  );
}

export default ConductedPollPage;
