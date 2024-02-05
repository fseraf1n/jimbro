"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "../ui/scroll-area";
import StartWorkoutDrawer from "./start-workout-drawer";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import StartWorkoutForm from "./exercise-ui-drawer";

interface WorkoutData {
  id: number;
  created_at: string;
  user_id: string;
  name: number;
}

export default function StartWorkoutModal({
  workoutData,
}: {
  workoutData: any;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutData>(
    {} as WorkoutData
  );

  const handleButtonClick = () => {
    setIsPopoverOpen((prev) => !prev);
  };
  const form = useForm({
    mode: "onChange",
  });

  const onSubmit = async (values: any) => {
    // const response = await fetch("/api/workout-log/create/", {
    //   method: "POST",
    //   body: JSON.stringify({ ...values, user_id: workoutData[0].user_id }),
    // });
    // const data = await response.json();
    // console.log(data);
    // setCurrentWorkout(data.data[0]);
    // console.log(
    //   workoutData.find(
    //     (workout: any) => workout.id == currentWorkout.workout_id
    //   )
    // );
    // if (response.ok) {
    //   setIsPopoverOpen(false);
    //   setIsDrawerOpen(true);
    // }
    console.log(values);
    setCurrentWorkout(
      workoutData.find((workout: any) => workout.id == values.workout_id)
    );
    console.log(currentWorkout);
    setIsPopoverOpen(false);
    setIsDrawerOpen(true);
  };
  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="">
          <DrawerHeader className="flex-1">
            <div className="">
              <DrawerTitle className="text-xl">
                {currentWorkout.name}
              </DrawerTitle>
            </div>
          </DrawerHeader>
          <div className="w-full h-full">
            {/* <StartWorkoutForm /> */}
          </div>
        </DrawerContent>
        <div>
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
              <Card
                className={`rounded-3xl shadow-2xl ${
                  workoutData.length > 3 ? "h-80" : "h-60"
                }`}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                      <CardTitle className="text-lg">start a workout</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full">
                      <ScrollArea className="h-40 w-full mx-auto">
                        <div className="p-3">
                          <FormField
                            control={form.control}
                            name="workout_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className=""
                                  >
                                    {workoutData.map((workout: any) => (
                                      <FormItem key={workout.id}>
                                        <FormControl>
                                          <div className="flex flex-col space-y-5">
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                className="h-6 w-6"
                                                value={workout.id}
                                                id={workout.id}
                                              />
                                              <Label htmlFor="option-one">
                                                {workout.name}
                                              </Label>
                                            </div>
                                          </div>
                                        </FormControl>
                                      </FormItem>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          {/* <Accordion type="single" className="w-full" collapsible>
                        <RadioGroup defaultValue="option-one" className="">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>week 1</AccordionTrigger>
                            <AccordionContent className="px-4 pt-1">
                              <div className="flex flex-col space-y-5">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    className="h-6 w-6"
                                    value="option-one"
                                    id="option-one"
                                  />
                                  <Label htmlFor="option-one">p1</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    className="h-6 w-6"
                                    value="option-two"
                                    id="option-two"
                                  />
                                  <Label htmlFor="option-two">p2</Label>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </RadioGroup>
                      </Accordion> */}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="fixed bottom-4 right-2">
                      <Button
                        type="submit"
                        variant={"default"}
                        className="ml-auto"
                      >
                        go time
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </Drawer>
    </>
  );
}
