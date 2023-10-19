import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil1Icon, TrashIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";

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

function Cards({ id, title, description }) {
  const router = useRouter();

  const handleBack = () => {
    router.push(`/poll/${id}`);
  };

  const randomBackgroundColor = getRandomColor();

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">  
      <Card >
        <CardHeader>
          <div className={`bg-center rounded-xl bg-no-repeat relative min-h-[175px] bg-[url('/images/poll.png')] contrast-50`}>
            <div className={`absolute rounded-xl inset-0 h-full w-full ${randomBackgroundColor} bg-opacity-80`}></div>
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className=" items-start flex flex-col">
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Pencil1Icon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant ="secondary" onClick={handleBack} className="w-full" >
              <OpenInNewWindowIcon  className="h-4 w-4 mr-2" />
              Vis Poll
          </Button>
        </CardFooter>

      </Card>
    </div>
  );
}

export default Cards;
