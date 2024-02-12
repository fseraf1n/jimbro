"use client";
import React from "react";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import CreateWorkoutForm from "@/app/workouts/create-workout-form";
import { ScrollArea } from "../ui/scroll-area";

export default function CreateWorkoutModal({
  exerciseCatalog,
}: {
  exerciseCatalog: any;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const handleButtonClick = () => {
    setIsPopoverOpen((prev) => !prev);
  };
  return (
    <div>
      <Drawer>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal>
          <PopoverTrigger asChild>
            <div className="flex justify-center align-middle self-center">
              <button
                className={`mx-auto rounded-full ${
                  isPopoverOpen
                    ? "hover:animate-pulse scale-150 transition duration-300"
                    : ""
                }`}
                onClick={handleButtonClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#eab308"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#eab308"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                  />
                </svg>
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 bg-transparent border-none shadow-none"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">no workouts yet</CardTitle>
              </CardHeader>
              <CardContent>
                do you want to create a workout template ?
              </CardContent>
              <CardFooter className="flex justify-end">
                <DrawerTrigger asChild>
                  <Button>create workout</Button>
                </DrawerTrigger>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
        <DrawerContent className=" w-full h-[650px] rounded-md">
          <ScrollArea className="">
            <CreateWorkoutForm exerciseCatalog={exerciseCatalog} />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
