import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { PlusIcon } from "@radix-ui/react-icons"

export default function QuestionForm({ handleSavePoll, pollTitle, polls, handleQuestionChange, handleOptionChange, addOption, addQuestion }) {
  return (
    <div>
    <CardHeader>
      <CardTitle className="text-3xl font-bold mb-4">{pollTitle}</CardTitle>
    </CardHeader>

    {polls.map((question, questionIndex) => (
      <CardContent key={questionIndex} className="mb-4">
        <Label className="block text-sm font-bold mb-2">Spørsmål {questionIndex + 1}:</Label>
        <Input
          type="text"
          className="w-full border rounded py-2 px-3"
          value={question.title}
          onChange={(e) => handleQuestionChange(questionIndex, 'title', e.target.value)}
        />
        <Label className="block text-sm font-bold mb-2">Svaralternativer:</Label>
        {question.answerOptions.map((option, optionIndex) => (
          <Input
            type="text"
            className="w-full border rounded py-2 px-3 mb-2"
            value={option}
            onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
            key={optionIndex}
          />
        ))}


    <Button onClick={() => addOption(questionIndex)} variant="outline">
      <PlusIcon className="mr-2 h-4 w-4" />
      Legg til svaralternativ
    </Button>

      </CardContent>
    ))}
    <CardFooter className="flex justify-between">
      <Button
        variant="secondary"
        onClick={addQuestion}
      >
  <PlusIcon className="mr-2 h-4 w-4" />
      Legg til spørsmål
    </Button>
      <Button
        onClick={handleSavePoll}
      >
        Lagre Poll
      </Button>
    </CardFooter>
  </div>
  );
}
