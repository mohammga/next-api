"use client"

import { useState, useEffect } from "react";
import Poll from "@/components/poll/Poll";
import Result from "@/components/poll/Result";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Take() {
  const [hasTakenPoll, setHasTakenPoll] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [pollData, setPollData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const handleFinish = (answers) => {
    setUserAnswers(answers);
    setIsFinished(true);
  };

  const handleRestart = () => {
    setIsFinished(false);
    setUserAnswers([]);
    router.push("/poll/conducted-poll");
  };


  //sjekke om brukeren har tatt pollen fra før og kan ikke ta den igjen

  useEffect(() => {
    fetch(`/api/polls/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Poll not found");
        }
        return response.json();
      })
      .then((poll) => {
        setPollData(poll.data);
        setHasTakenPoll(poll.hasTaken);
      })
      .catch((error) => {
        console.error("Failed to fetch poll data:", error);
        setHasError(true);
      });
  }, []);

return (
  <div>
    {hasError ? (
      <p className="py-4">Pollen du prøver å få tilgang til eksisterer ikke.</p>
    ) : hasTakenPoll ? (
      <p className="py-4">Du kan ikke ta denne pollen igjen.</p>
    ) : pollData ? (
      session?.user?.id === pollData.authorId ? (
        <p className="py-4">
          Du kan ikke gjennomføre denne pollen, fordi du er forfatteren.
        </p>
      ) : !isFinished ? (
        <Poll data={pollData} onFinish={handleFinish} />
      ) : (
        <Result
          questions={pollData}
          answers={userAnswers}
          onRestart={handleRestart}
        />
      )
    ) : (
     <p className="py-4">Laster inn...</p>
    )}
  </div>
);
}
