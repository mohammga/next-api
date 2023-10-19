import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PollResult({ pollURL }) {
  const router = useRouter();

  const handleBack = () => {
    router.push(pollURL);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Pollen din ble lagret!</h1>
      <p>
        Del lenken nedenfor med andre for å se pollen:{" "}
        <span 
            className="text-blue-500 cursor-pointer hover:underline" 
            onClick={handleBack}
        >
            http://localhost:3000{pollURL}
        </span>
      </p>
      <Link className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400" href="/poll">
        Tilbake
      </Link>
    </div>
  );
}
