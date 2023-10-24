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

export default function PollResult({ pollURL }) {
  const copyToClipboard = () => {
    const linkInput = document.getElementById("link");
    linkInput.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Del</Button>
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
              defaultValue={`http://localhost:3000 ${pollURL}`}
              readOnly
            />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
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
  );
}
