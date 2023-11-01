"use client"

import { useState } from 'react';
import NewPollStart from "@/components/poll/new/NewPollStart"
import NewPollResult from '@/components/poll/new/NewPollResult';
import { useSession } from 'next-auth/react';
import NewPollForm from '@/components/poll/new/NewPollForm';


export default function New() {
  const [pollTitle, setPollTitle] = useState('');
  const [pollDescription, setPollDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [pollURL, setPollURL] = useState('');
  const { data: session } = useSession();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      {currentStep === 1 && (
        <NewPollStart
          pollTitle={pollTitle}
          setPollTitle={setPollTitle}
          pollDescription={pollDescription}
          setPollDescription={setPollDescription}
          nextStep={nextStep} />
      )}
      {currentStep === 2 && !showResult && (
          <NewPollForm pollTitle={pollTitle} pollDescription={pollDescription} session={session} setPollURL={setPollURL} setShowResult={setShowResult} />
      )}
      {showResult && (
        <NewPollResult pollURL={pollURL} />
      )}
    </>
  );
}
