"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Cross1Icon,
  Cross2Icon,
  CrossCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

const workoutSchema = yup.object({
  workoutName: yup.string(),
  exercise: yup.array(
    yup.object({
      exerciseName: yup.string(),
      sets: yup
        .array(
          yup.object({
            previous_weight: yup.number(),
            current_weight: yup.number(),
            unit: yup.string(),
            reps: yup.number(),
          })
        )
        .optional(),
    })
  ),
});
interface SetField {
  previous_weight?: number | undefined;
  current_weight?: number | undefined;
  unit?: string | undefined;
  reps?: number | undefined;
}

const Sets = ({ form, exerciseIndex }: { form: any; exerciseIndex: any }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `exercise.${exerciseIndex}.sets`,
  });

  return (
    <>
      <div className="grid grid-cols-6 gap-2 -ml-1">
        <span className="ml-1 text-muted-foreground tracking-tight text-xs">
          set
        </span>
        <span className="ml-1 text-muted-foreground tracking-tight text-xs">
          prev
        </span>
        <span className="ml-1 text-muted-foreground tracking-tight text-xs">
          current
        </span>
        <span className="ml-1 text-muted-foreground tracking-tight text-xs">
          unit
        </span>
        <span className="ml-1 text-muted-foreground tracking-tight text-xs">
          reps
        </span>
      </div>
      {fields.map((fieldItem: any, fieldIndex: any) => (
        <div key={fieldIndex} className="flex flex-col">
          <div className="grid grid-cols-6 gap-2">
            <>
              <div className="h-[36px] px-1 py-1">
                <span className="text-sm font-mono text-muted-foreground">
                  {fieldIndex + 1}
                </span>
              </div>
              <FormItem>
                <FormControl>
                  <FormField
                    control={form.control}
                    name={`exercise.${exerciseIndex}.sets[${fieldIndex}].previous_weight`}
                    render={(field) => (
                      <Input inputMode="numeric" placeholder="" {...field.field} />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <FormField
                    control={form.control}
                    name={`exercise.${exerciseIndex}.sets[${fieldIndex}].current_weight`}
                    render={(field) => (
                      <Input inputMode="numeric" placeholder="" {...field.field} />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <FormField
                    control={form.control}
                    name={`exercise.${exerciseIndex}.sets[${fieldIndex}].unit`}
                    render={(field) => (
                      <Input placeholder="" {...field.field} />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <FormField
                    control={form.control}
                    name={`exercise.${exerciseIndex}.sets[${fieldIndex}].reps`}
                    render={(field) => (
                      <Input inputMode="numeric" placeholder="" {...field.field} />
                    )}
                  />
                </FormControl>
              </FormItem>
            </>

            <Button
              type="button"
              className="self-end"
              variant="ghost"
              onClick={() => remove(fieldIndex)}
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant={"secondary"}
        className="w-1/3 mt-2 self-center bg-slate-200"
        onClick={() =>
          append({
            previous_weight: undefined,
            current_weight: undefined,
            unit: form.getValues().exercise[exerciseIndex]?.sets[0]?.unit ?? undefined,
            reps: form.getValues().exercise[exerciseIndex]?.sets[0]?.reps ?? undefined,
          })
        }
      >
        add set
      </Button>
    </>
  );
};

export default function StartWorkoutForm({workout}:{workout: any}) {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      workoutName: "",
      exercise: [
        {
          exerciseName: "",
          sets: [
            {
              previous_weight: "",
              current_weight: "",
              unit: "",
              reps: "",
            },
          ],
        },
      ],
    },
  });

  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const response = await fetch("/api/workouts/create", {
        body: JSON.stringify(values),
        method: "POST"
      })
      const data = await response.json();
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercise",
  });

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 p-2">
            <div className="mb-1">
              <FormField
                control={form.control}
                name="workoutName"
                render={(field) => (
                  <FormItem>
                    <FormControl>
                      {/* <Input placeholder="Enter workout name" {...field.field} /> */}
                      <input
                        className="flex h-9 w-11/12 rounded-md border-input bg-transparent px-1 py-1 text-xl font-bold tracking-tight transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="workout title ?"
                        {...field.field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {fields.map((fieldAItem: any, exerciseIndex: number) => (
              <div className="flex flex-col gap-2" key={exerciseIndex}>
                <FormField
                  control={form.control}
                  name={`exercise.${exerciseIndex}.exerciseName`}
                  render={(field) => (
                    <div>
                      <FormItem>
                        <FormControl>
                          <input
                            className="flex mb-2 h-9 w-2/3 rounded-md border-input bg-transparent px-1 py-1 text-lg font-semibold tracking-tight transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="exercise name ?"
                            {...field.field}
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  )}
                />
                <Sets form={form} exerciseIndex={exerciseIndex} />
                
              </div>
            ))}
            <Button
                  type="button"
                  variant={"secondary"}
                  className="w-3/5  self-center mt-2 bg-stone-200"
                  onClick={() =>
                    append({
                      exerciseName: "",
                      sets: [
                        {
                          previous_weight: "",
                          current_weight: "",
                          unit: "",
                          reps: "",
                        },
                      ],
                    })
                  }
                >
                  add exercise
                </Button>
            <Button className="self-end bg-slate-700" type="submit">
              finish workout
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
