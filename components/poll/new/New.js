"use client"

import { useState } from 'react';
<<<<<<< Updated upstream
import PollStart from "@/components/poll/new/PollStart"
import PollResult from '@/components/poll/new/PollResult';
=======
import NewPollResult from '@/components/poll/new/NewPollResult';
>>>>>>> Stashed changes
import { useSession } from 'next-auth/react';
import Test from '@/components/poll/new/Test';


export default function New() {
  const [showResult, setShowResult] = useState(false);
  const [pollURL, setPollURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();


  return (
    <>
<<<<<<< Updated upstream
      {currentStep === 1 && (
        <PollStart
          pollTitle={pollTitle}
          setPollTitle={setPollTitle}
          pollDescription={pollDescription}
          setPollDescription={setPollDescription}
          nextStep={nextStep} />
      )}
      {currentStep === 2 && !showResult && (
          <Test pollTitle={pollTitle} pollDescription={pollDescription} session={session} setPollURL={setPollURL} setShowResult={setShowResult} />
=======
      {!showResult && (
          <NewPollForm isLoading={isLoading} setIsLoading={setIsLoading} session={session} setPollURL={setPollURL} setShowResult={setShowResult} />
>>>>>>> Stashed changes
      )}
      {showResult && (
        <PollResult pollURL={pollURL} />
      )}
    </>
  );
}
