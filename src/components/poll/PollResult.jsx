import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PollResult({ pollURL }) {
  const router = useRouter();

  const handleView = () => {
    router.push(pollURL);
  };

    const handleBack = () => {
    router.push("/");
  };



  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Pollen din ble lagret!</h1>
      <p>
        Del lenken med andre for å se pollen:{" "}
        <span 
            className="text-blue-500 cursor-pointer hover:underline" 
            onClick={handleView}
        >
            http://localhost:3000{pollURL}
        </span>
      </p>
      <Button onClick={handleBack}>Tilbake</Button>
    </div>
  );
}
