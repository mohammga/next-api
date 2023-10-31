import { Button } from "@/components/ui/button";

function Result({ onRestart }) {

  return (
    <div className="py-4">
      <h2 className="pb-2 text-xl font-semibold">Takk for ditt svar!</h2>
      <p className="pb-2">Pollen er nå velykket sendt og gjennomført.</p>
      <Button onClick={onRestart}>
        Lukk
      </Button>
    </div>
  );
}

export default Result;
