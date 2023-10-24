import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


function ViewPoll({ data }) {

  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  }

  return (
    <div className="w-full my-2 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p className="text-muted-foreground mb-4">{data.description}</p>
      {data.questions.map((question, index) => (
        <div key={index} className="p-4 border border-border rounded-md mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Spørsmål {index + 1}: {question.title}
          </h2>
          <ul className="list-disc pl-5 font-light">
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex} className="mb-2">
                {option.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={handleBack}>
          Tilbake
        </Button>
        <Button>Del Lenke</Button>
      </div>
    </div>
  );
}

export default ViewPoll;
