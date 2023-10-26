"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


function Poll({ data, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const isAnswerSelected = typeof selected[currentIndex] !== "undefined";

  const router = useRouter();

  const handleChoice = (optionIndex, index) => {
    const newSelected = [...selected];
    newSelected[index] = parseInt(optionIndex);
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


  const handleBack = () => {
    router.push("/poll");
  };


return (
  <form>
    <div className="w-full my-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="text-muted-foreground mb-4">{data.description}</p>
      {data.questions.map((question, index) => (
    <div key={index} className="p-4 border border-border rounded-md mb-4">
        <h2 className="text-lg font-semibold mb-2">
            Spørsmål {index + 1}: {question.title}
        </h2>

        <div>
            <label className="mb-8">Velg et alternativ nedenfor:</label>
            <RadioGroup
                value={selected[index]}
                onValueChange={value => handleChoice(value, index)}
            >
                {question.options.map((option, optionIndex) => (
                    <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={optionIndex.toString()}>
                        </RadioGroupItem>
                        <Label>{option.title}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    </div>
))}

      <div className="flex gap-4 mt-4">
        <Button type="button" variant="outline" onClick={handleBack}>
          Tilbake
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </div>
  </form>
);

}

export default Poll;
