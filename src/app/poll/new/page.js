"use client"
import React, { useState } from 'react';
import PollStart from "@/components/poll/PollStart"
import QuestionForm from '@/components/poll/QuestionForm';
import PollResult from '@/components/poll/PollResult';

export default function CreatePoll() {
  const [polls, setPolls] = useState([{ title: '', description: '', answerOptions: [''] }]);
  const [pollTitle, setPollTitle] = useState('');
  const [pollDescription, setPollDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [pollURL, setPollURL] = useState('');

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const addQuestion = () => {
    const updatedPolls = [...polls, { title: '', description: '', answerOptions: [''] }];
    setPolls(updatedPolls);
  };

  const addOption = (index) => {
    const updatedPolls = [...polls];
    updatedPolls[index].answerOptions.push('');
    setPolls(updatedPolls);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedPolls = [...polls];
    updatedPolls[index][field] = value;
    setPolls(updatedPolls);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedPolls = [...polls];
    updatedPolls[questionIndex].answerOptions[optionIndex] = value;
    setPolls(updatedPolls);
  };

  const handleSavePoll = async () => {
    // 1. Structure your poll data.
    const pollData = {
      title: pollTitle,
      authorId: 'clnxz8qef0000t3t4pydc7djh',
      description: pollDescription,
      questions: polls.map(poll => ({
        title: poll.title,
        options: poll.answerOptions.map(option => ({
          title: option
        }))
      }))
    };
  
    // 2. Use the Fetch API to make a POST request.
    try {
      const response = await fetch('/api/poll/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pollData)
      });
  
      const responseData = await response.json();
  
      // 3. Handle the API response and update the UI.
      if (response.ok) {
        setShowResult(true);
        // You might want to generate the poll URL based on the received ID or some other logic.
        // For now, I'm assuming the poll URL structure is `/poll/{id}`
        setPollURL(`/poll/${responseData.poll.id}`);
      } else {
        // Handle errors. You can show an error message to the user, for example.
        console.error('Failed to save the poll:', responseData.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <div className="p-4">
      {currentStep === 1 && (
        <PollStart
          pollTitle={pollTitle}
          setPollTitle={setPollTitle}
          pollDescription={pollDescription}
          setPollDescription={setPollDescription}
          nextStep={nextStep} />
      )}
      {currentStep === 2 && !showResult && (
        <div>
          <QuestionForm pollTitle={pollTitle}
            handleSavePoll={handleSavePoll}
            polls={polls}
            handleOptionChange={handleOptionChange}
            handleQuestionChange={handleQuestionChange}
            addOption={addOption}
            addQuestion={addQuestion} />
        </div>
      )}
      {showResult && (
        <PollResult pollURL={pollURL} />
      )}
    </div>
  );
}
