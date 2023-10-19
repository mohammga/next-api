"use client"

import { useState, useEffect } from "react";
import ViewPoll from "@/components/poll/ViewPoll";
import { useParams } from "next/navigation";

export default function Poll() {
  const [pollData, setPollData] = useState(null);
  const [hasError, setHasError] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
      fetch(`/api/poll/get?pollId=${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Poll not found');
          }
          return response.json();
        })
        .then(data => {
          setPollData(data);
        })
        .catch(error => {
          console.error('Failed to fetch poll data:', error);
          setHasError(true);
        });
  }, []);

  return (
    <div>
      {hasError ? (
        <p>Pollen du prøver å få tilgang til eksisterer ikke.</p>
      ) : pollData ? (
        <ViewPoll data={pollData} pollId={id} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
