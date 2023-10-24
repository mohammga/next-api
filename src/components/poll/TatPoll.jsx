"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
 "@/components/ui/alert-dialog";

import { format } from "date-fns";
import { nb } from "date-fns/locale"; // Import Norwegian locale
function getRandomColor() {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-cyan-500",
    "bg-teal-500",
    "bg-lime-500",
    "bg-amber-500",
    "bg-gray-500",
  ];

  
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function TatPoll ({ id, title, description, createdAt }) {
  const router = useRouter();


  const formattedDate = format(new Date(createdAt), "PPP", { locale: nb });

  const randomBackgroundColor = getRandomColor();
  

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
      <Card className="flex flex-col gap-4 h-full">
        <CardHeader>
          <div
            className={`bg-center rounded-xl bg-no-repeat relative min-h-[175px] bg-[url('/images/poll.png')] contrast-50`}
          >
            <div
              className={`absolute rounded-xl inset-0 h-full w-full ${randomBackgroundColor} bg-opacity-80`}
            ></div>
          </div>
          <CardDescription>Publisert: {formattedDate}</CardDescription>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </div>

  );
}

export default TatPoll;
