import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
}
from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"

export default function PollStart({ pollTitle, setPollTitle, pollDescription, setPollDescription, nextStep }) {

    return (
      <Card className="flex mx-auto w-4/12 flex-col gap-4 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold mb-8">Opprett en Poll</CardTitle>
      </CardHeader>
      <CardContent>
        <Label className="block text-sm font-bold mb-2">Tittel:</Label>
        <Input
          type="text"
          className="w-full border rounded py-2 px-3"
          value={pollTitle}
          onChange={(e) => setPollTitle(e.target.value)}
        />
        <Label className="block text-sm font-bold mb-2">Beskrivelse:</Label>
        <Input
          type="text"
          className="w-full border rounded py-2 px-3"
          value={pollDescription}
          onChange={(e) => setPollDescription(e.target.value)}
        />
        <Button onClick={nextStep}>
          Neste
        </Button>
      </CardContent>
    </Card>
    );
  }





