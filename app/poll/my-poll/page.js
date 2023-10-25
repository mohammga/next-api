"use client";

import { useState, useEffect } from "react";
import MyPollGrid from "@/components/poll/MyPollGrid";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

function MyPollPage() {
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
    return <div>Laster inn...</div>;
  }

  return (
    <div>
      {myPolls.length > 0 ? (
        <MyPollGrid data={myPolls} title={"Mine Poll"} />
      ) : (
        <div className="py-4">
          <h2 className="pb-4 text-xl font-semibold">Mine Poll</h2>
          <p>Du har ikke laget noen poll ennå.</p>
          <Button onClick={handleCreate}>Opprett en poll</Button>
        </div>
      )}
    </div>
  );
}

export default MyPollPage;
