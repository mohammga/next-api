import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"

export default function PollStart({ pollTitle, setPollTitle, pollDescription, setPollDescription, nextStep }) {

  return (
    <div className="flex w-full md:mx-auto md:w-6/12 flex-col ">
      <div>
        <h1 className="text-3xl font-semibold">Opprett en Poll</h1>
      </div>
      <div>
        <Label className="block text-sm font-bold mb-2">Tittel:</Label>
        <Input
          type="text"
          className="w-full"
          value={pollTitle}
          onChange={(e) => setPollTitle(e.target.value)}
        />
        <Label className="block text-sm font-bold mb-2">Beskrivelse:</Label>
        <Input
          type="text"
          className="w-full"
          value={pollDescription}
          onChange={(e) => setPollDescription(e.target.value)}
        />
        <Button onClick={nextStep}>
          Neste
        </Button>
      </div>
    </div>

  );
}





