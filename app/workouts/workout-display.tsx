"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DotsHorizontalIcon, Pencil1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { Workout } from "@/lib/types";

export default function WorkoutDisplay({ data }: { data: any }) {
  // console.dir(workoutData, {depth: null})
  return (
    <div>
      <ScrollArea className="w-full h-[480px]">
        {/* <Accordion type="single" collapsible className="w-full px-3 py-2">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">week 1</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <div className="flex flex-col gap-2">
                <Card className="shadow-sm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>p1</CardTitle>
                      <Pencil1Icon />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="text-muted-foreground">
                      <span className="font-semibold">exercises:</span> squats,
                      bench press, db curls...
                    </span>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">week 2</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">week 3</AccordionTrigger>
            <AccordionContent>
              Yes. Its animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          </Accordion> */}
        {data.map((item: Workout) => (
          <div
            key={`${item.name}.${item.id}`}
            className="flex flex-col gap-2 mb-2"
          >
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{item.name}</CardTitle>
                  <Pencil2Icon />
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <DotsHorizontalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-1">
                      <DropdownMenuItem className="text-muted-foreground">
                        edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-muted-foreground">
                        duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-muted-foreground">
                        delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                </div>
              </CardHeader>
              <CardContent className="w-full line-clamp-2">
                <span className="text-muted-foreground line-clamp-2">
                  <span className="text-muted-foreground font-semibold">
                    exercises:{" "}
                  </span>
                  {item.exercise_templates.map((exercise, index) => (
                    <React.Fragment key={index}>
                      {exercise.exercise_name}
                      {index < item.exercise_templates.length - 1 && <span>, </span>}
                    </React.Fragment>
                  ))}
                </span>
              </CardContent>
            </Card>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
