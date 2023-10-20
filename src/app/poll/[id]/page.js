"use client"

import { useState, useEffect } from "react";
import Poll from "@/components/poll/Poll";
import Result from "@/components/poll/Result";
import { useRouter, useParams } from "next/navigation";

export default function Page() {
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [pollData, setPollData] = useState(null);
  const [hasError, setHasError] = useState(false);
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
    router.push("/poll");
  };

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
        !isFinished ? (
          <Poll data={pollData} onFinish={handleFinish} />
        ) : (
          <Result
            questions={pollData}
            answers={userAnswers}
            onRestart={handleRestart}
          />
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
