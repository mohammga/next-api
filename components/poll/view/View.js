"use client"

import { useState, useEffect } from "react";
import ViewPoll from "@/components/poll/view/ViewPoll";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function View() {
  const [pollData, setPollData] = useState(null);
  const [hasError, setHasError] = useState(false);

  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
      fetch(`/api/polls/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Poll not found');
          }
          return response.json();
        })
        .then(poll => {
          setPollData(poll.data);
        })
        .catch(error => {
          console.error('Failed to fetch poll data:', error);
          setHasError(true);
        });
  }, []);

  const handleBack = () => {
    router.push("/poll");
  }

  return (
    <div>
      {hasError ? (
        <div className="py-4">
        <p className="pb-2">Pollen du prøver å se eksisterer ikke, ta en annen poll.</p>
        <Button onClick={handleBack}>Ta en annen poll</Button>
   
        </div>
      ) : pollData ? (
        <ViewPoll data={pollData} pollId={id} />
      ) : (
        <p>Laster inn...</p>
      )}
    </div>
  );
}

export default View;
