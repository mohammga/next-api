"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { truncate } from "@/utils/truncate";
import { getRandomColor } from "@/utils/background-colors";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

function PollifyCard({ id, title, description, createdAt }) {
  const router = useRouter();
  const formattedDate = format(new Date(createdAt), "PPP", { locale: nb });
  const randomBackgroundColor = getRandomColor();

  const handleOpen = () => {
    router.push(`/poll/${id}`);
  };

  return (
    <div className="w-full">
      <Card className="flex flex-col h-full">
        <CardHeader className="pb-2">
          <div
            className={`bg-center rounded-xl bg-no-repeat relative min-h-[175px] bg-[url('/images/poll.png')] contrast-50`}
          >
            <div
              className={`absolute rounded-xl inset-0 h-full w-full ${randomBackgroundColor} bg-opacity-80`}
            ></div>
          </div>
          <CardDescription className="font-light py-1">
            Publisert: {formattedDate}
          </CardDescription>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pt-0 m-0">
          <p className="text-sm text-muted-foreground">
            {truncate(description)}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" onClick={handleOpen} className="w-full">
            <OpenInNewWindowIcon className="h-4 w-4 mr-2" />
            Ta Poll
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PollifyCard;