import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function ViewPoll({ data, pollId }) {

    const router = useRouter();

    const handleBack = () => {
        router.push("/poll");
    }

    const handleEdit = () => {
        router.push(`/poll/edit/${pollId}`);
    }

    return (
      <div className="container mx-auto p-4 shadow-lg rounded bg-white">
        <h1 className="text-xl font-bold mb-2">{data.title}</h1>
        <p className="mb-4">{data.description}</p>
        {data.questions.map((question, index) => (
          <div key={index} className="p-4 border-b border-gray-200">
            <h2 className="text-lg mb-2">Spørsmål {index + 1}: {question.title}</h2>
            <ul className="list-disc pl-5">
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} className="mb-1">{option.title}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex gap-2 mt-4">
          <Button onClick={handleBack} variant="outline">Tilbake</Button>
          <Button onClick={handleEdit}>Rediger</Button>
        </div>
      </div>
    );
}

export default ViewPoll;
