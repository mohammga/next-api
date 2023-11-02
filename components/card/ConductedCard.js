"use client";

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

import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

function ConductedCard({ title, description, conductedAt }) {
  const formattedDate = format(new Date(conductedAt), "PPP", { locale: nb });

  const randomBackgroundColor = getRandomColor();

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
            Gjennomført: {formattedDate}
          </CardDescription>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pt-0 pb-4 m-0">
          <p className="text-sm text-muted-foreground">
            {truncate(description)}
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 items-center">
            <CheckCircle2 className="text-green-500" />
            <p className="text-sm font-light text-muted-foreground">Gjennomført</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ConductedCard;
