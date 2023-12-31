"use client";

import { useState, useEffect } from "react";
import MyPollGrid from "@/components/grid/MyPollGrid";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function MyPoll() {
  const [myPolls, setMyPolls] = useState([]);
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

  const handleCreate = () => {
    router.push("/poll/new");

  }

  if (isLoading) {
    return <p className="py-4">Laster inn...</p>;
  }

  return (
    <>
      {myPolls.length > 0 ? (
        <MyPollGrid data={myPolls} title={"Mine Poll"} />
      ) : (
        <div className="py-4">
          <h2 className="pb-2 text-xl font-semibold">Mine Poll</h2>
          <p className="pb-2 text-muted-foreground">
            Du har ikke opprettet noen poll ennå. Klar for å opprette din
            første?
          </p>
          <Button onClick={handleCreate}>Opprett en poll</Button>
        </div>
      )}
    </>
  );
}

export default MyPoll;
