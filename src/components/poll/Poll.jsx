"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";

function Poll({ data, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const isAnswerSelected = typeof selected[currentIndex] !== "undefined";

  const handleNext = () => {
    if (currentIndex < data.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
      onFinish(selected);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleChoice = (index) => {
    const newSelected = [...selected];
    newSelected[currentIndex] = index;
    setSelected(newSelected);
  };

  const handleSubmit = async () => {
    // Assuming you have a user ID. 
    // TODO: Fetch this value properly, possibly from a user context or authentication.
    const userId = "clnt69nie0002t3sox09fe9ie";
  
    // Preparing data to send to the backend
    const answersData = {
      pollId: data.id,
      userId: userId,
      answers: selected.map((choiceIndex, questionIndex) => ({
        questionId: data.questions[questionIndex].id,
        optionId: data.questions[questionIndex].options[choiceIndex].id
      }))
    };

    console.log('Selected:', selected);

    console.log('Submitting answers:', answersData);
  
    // Send data to backend
    try {
      const response = await fetch('/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answersData),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
  
      console.log('Answers saved successfully:', result);
    } catch (error) {
      console.error('Failed to submit answers:', error);
    }
  };
  

  return (
  <Card className="flex flex-col items-center justify-center p-8 min-h-screen">
  <CardHeader>
    <CardTitle className="text-3xl font-semibold mb-8">{data.title}</CardTitle>
    <CardDescription className="text-gray-700 mb-8">Beskrivelse: {data.description}</CardDescription>
  </CardHeader>
  <CardContent className="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h2 className="text-xl font-semibold mb-4">{data.questions[currentIndex].title}</h2>
    
    <form className="space-y-4">
      <CardDescription className="text-gray-700 mb-8">Velg et alternativ nedenfor:</CardDescription>
      {data.questions[currentIndex].options.map((option, index) => (
        <div key={index} className="flex items-center space-x-3">
          <input
            type="radio"
            name="quiz-answer"
            value={option.id}
            checked={selected[currentIndex] === index}
            onChange={() => handleChoice(index)}
            required
            className="text-blue-500 h-4 w-4"
          />
          <CardDescription className="text-gray-700">{option.title}</CardDescription>
        </div>
      ))}
    </form>
    
    <div className="flex gap-4 mt-8">
      {currentIndex > 0 && (
        <Button
          onClick={handlePrev}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Tilbake
        </Button>
      )}
      
      {isAnswerSelected && (
        <Button
          onClick={handleNext}
          className="bg-green-500 hover-bg-green-600 text-white py-2 px-4 rounded"
        >
          {currentIndex === data.questions.length - 1 ? "Send" : "Neste"}
        </Button>
      )}
    </div>
  </CardContent>
</Card>

  
  );
}

export default Poll;
