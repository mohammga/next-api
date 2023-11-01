"use client"

import { useState, useEffect } from "react";
import TakePollForm from "@/components/form/TakePollForm";
import TakePollResult from "@/components/poll/take/TakePollResult";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";


export default function Take() {
  const [hasTakenPoll, setHasTakenPoll] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [pollData, setPollData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleBack = () => {
    router.push("/poll");
  }


  useEffect(() => {
    fetch(`/api/polls/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Poll not found");
        }
        return response.json();
      })
      .then((poll) => {
        
        if(poll.hasTaken) {
          setHasTakenPoll(true);
        }
        else{
          setPollData(poll.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch poll data:", error);
        setHasError(true);
      });
  }, []);


return (
  <div>
    {hasTakenPoll ? (
      <div className="py-4">
        <p className="pb-2 text-muted-foreground">
          Du har allerede gjennomført denne pollen og kan ikke ta den på nytt.
        </p>
        <Button onClick={handleBack}>Ta en annen poll</Button>
      </div>
    ) : hasError ? (
      <div className="py-4">
        <p className="pb-2 text-muted-foreground">
          Pollen du prøver å tilgang til eksisterer ikke, ta en annen poll.
        </p>
        <Button onClick={handleBack}>Ta en annen poll</Button>
      </div>
    ) : pollData ? (
      session?.user?.id === pollData.authorId ? (
        <div className="py-4">
          <p className="pb-2 text-muted-foreground">
            Du kan ikke gjennomføre denne pollen, fordi du er forfatteren.
          </p>
          <Button onClick={handleBack}>Ta en annen poll</Button>
        </div>
      ) : !isFinished ? (
        <TakePollForm
          data={pollData}
          onFinish={handleFinish}
          isLoading={isFinished}
          setIsLoading={setIsLoading}
        />
      ) : (
        <TakePollResult
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
