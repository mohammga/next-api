"use client"

import { useState } from 'react';
import PollStart from "@/components/poll/new/PollStart"
import PollResult from '@/components/poll/new/PollResult';
import { useSession } from 'next-auth/react';
import Test from '@/components/poll/new/Test';


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
        <PollStart
          pollTitle={pollTitle}
          setPollTitle={setPollTitle}
          pollDescription={pollDescription}
          setPollDescription={setPollDescription}
          nextStep={nextStep} />
      )}
      {currentStep === 2 && !showResult && (
          <Test pollTitle={pollTitle} pollDescription={pollDescription} session={session} setPollURL={setPollURL} setShowResult={setShowResult} />
      )}
      {showResult && (
        <PollResult pollURL={pollURL} />
      )}
    </>
  );
}
