// "use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import CreateWorkoutForm from "./create-workout-form";
import WorkoutDisplay from "./workout-display";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Pencil1Icon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/initSupabase";
import { Workout } from "@/lib/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getCurrentUserData } from "../util-functions";

const fetchWorkoutData = async () => {
  const user = await getCurrentUserData();
  let { data: workout, error } = await supabase
    .from("workout")
    .select(`id, name, exercise(id, name, set(*))`)
    .eq("user_id", user?.id);
  // console.dir(workout, { depth: null });
  return workout;
};

export default async function WorkoutsPage() {
  const workoutData = await fetchWorkoutData();
  return (
    <div>
      <h2 className="p-3 tracking-tight"> my workouts</h2>
      <div className="w-full px-2">
        <Tabs defaultValue="Templates">
          <TabsList className="flex justify-around h-[50px]">
            <TabsTrigger value="Templates"> templates </TabsTrigger>
            <TabsTrigger value="Exercises"> exercises </TabsTrigger>
          </TabsList>
          <TabsContent className="h-[475px]" value="Templates">
            <Drawer>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="fixed z-50 bottom-16 right-2 p-4 bg-indigo-800 rounded-full shadow-lg w-14 h-14  active:bg-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 "
                    variant={"default"}
                  >
                    <PlusIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={-200}
                  className="w-[180px] mr-1"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 select-none active:scale-110 transition-transform focus:outline-none focus:ring focus:scale-125">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 self-center"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                        />
                      </svg>

                      <span>split planning</span>
                    </div>
                    <Separator />
                    <DrawerTrigger asChild>
                      <div className="flex gap-2 select-none active:scale-110 transition-transform focus:outline-none focus:ring focus:scale-125">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 self-center"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                          />
                        </svg>

                        <span>create workout</span>
                      </div>
                    </DrawerTrigger>
                  </div>
                </PopoverContent>
              </Popover>

              <DrawerContent className=" w-full h-[650px] rounded-md">
                <ScrollArea className="">
                  <CreateWorkoutForm />
                </ScrollArea>
              </DrawerContent>
            </Drawer>
            <WorkoutDisplay data={workoutData as Workout[]} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
