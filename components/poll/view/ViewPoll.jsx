import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ViewPoll({ data }) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/poll");
  };

  const copyToClipboard = () => {
    const linkInput = document.getElementById("link");
    linkInput.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Del Lenke</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Del linken</DialogTitle>
              <DialogDescription>
                Alle som har denne linken vil kunne se denne.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={process.env.NEXT_PUBLIC_URL + "/poll/" + data.id}
                />
              </div>
              <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={copyToClipboard}
              >
                <span className="sr-only">Kopier link</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Lukk
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default ViewPoll;
