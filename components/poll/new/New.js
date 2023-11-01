"use client"

import { useState } from 'react';
import NewPollResult from '@/components/poll/new/NewPollResult';
import { useSession } from 'next-auth/react';
import NewPollForm from '@/components/form/NewPollForm';


export default function New() {
  const [showResult, setShowResult] = useState(false);
  const [pollURL, setPollURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      {!showResult && (
          <NewPollForm isLoading={isLoading} setIsLoading={setIsLoading} session={session} setPollURL={setPollURL} setShowResult={setShowResult} />
      )}
      {showResult && (
        <NewPollResult pollURL={pollURL} />
      )}
    </>
  );
}
