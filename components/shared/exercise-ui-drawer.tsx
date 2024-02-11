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
import { ScrollArea } from "../ui/scroll-area";
import { DrawerTrigger } from "../ui/drawer";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const workoutSchema = yup.object({
  workoutId: yup.number(),
  workoutName: yup.string(),
  exercise_templates: yup.array(
    yup.object({
      exercise_name: yup.string(),
      set_data: yup
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
    name: `exercise_templates.${exerciseIndex}.set_data`,
  });

  const { watch } = form;
  const watchAllFields = watch();
  // React.useEffect(() => {
  //   localStorage.setItem("form_state", JSON.stringify(form.getValues()));
  //   console.log(localStorage.getItem("form_state"));
  // }, [form, watchAllFields]);
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
                    name={`exercise_templates.${exerciseIndex}.set_data[${fieldIndex}].previous_weight`}
                    render={(field) => (
                      <Input
                        inputMode="numeric"
                        placeholder=""
                        {...field.field}
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <FormField
                    control={form.control}
                    name={`exercise_templates.${exerciseIndex}.set_data[${fieldIndex}].current_weight`}
                    render={(field) => (
                      <Input
                        inputMode="numeric"
                        placeholder=""
                        {...field.field}
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <FormField
                    control={form.control}
                    name={`exercise_templates.${exerciseIndex}.set_data[${fieldIndex}].unit`}
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
                    name={`exercise_templates.${exerciseIndex}.set_data[${fieldIndex}].reps`}
                    render={(field) => (
                      <Input
                        inputMode="numeric"
                        placeholder=""
                        {...field.field}
                      />
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
            previous_weight: "",
            current_weight: "",
            unit:
              form.getValues().exercise_templates[exerciseIndex]?.set_data[0]
                ?.unit ?? "",
            reps:
              form.getValues().exercise_templates[exerciseIndex]?.set_data[0]
                ?.reps ?? "",
          })
        }
      >
        add set
      </Button>
    </>
  );
};

interface WorkoutData {
  workoutName: string;
}

export default function StartWorkoutForm({ workout }: { workout: any }) {
  const router = useRouter()
  const [cachedFormData, setCachedFormData] = React.useState("");

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      workoutId:
        JSON.parse(localStorage.getItem("form_state") ?? "{}").workoutId ??
        workout.id,
      workoutName:
        JSON.parse(localStorage.getItem("form_state") ?? "{}").workoutName ??
        workout.name,
      exercise_templates:
        JSON.parse(localStorage.getItem("form_state") ?? "{}")
          .exercise_templates ?? workout.exercise_templates,
    },
  });

  const { watch } = form;

  const watchAllFields = watch();

  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const response = await fetch("/api/workout-log/create", {
        body: JSON.stringify(values),
        method: "POST",
      });
      if (response.ok) {
        toast({
          title: "success",
          description: "workout logged",
        });
        router.refresh();
        localStorage.removeItem('form_state')
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercise_templates",
  });

  React.useEffect(() => {
    localStorage.setItem("form_state", JSON.stringify(form.getValues()));
    console.log(JSON.parse(localStorage.getItem("form_state") ?? ""));
  }, [form, watchAllFields]);

  const clearWorkout = () => {
    // setTimeout(() => {
    localStorage.removeItem("form_state");
    // }, 300);
  };
  return (
    <div className="flex flex-col">
      <></>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 p-2">
            {fields.map((fieldAItem: any, exerciseIndex: number) => (
              <div className="flex flex-col gap-2" key={exerciseIndex}>
                <FormField
                  control={form.control}
                  name={`exercise_templates.${exerciseIndex}.exercise_name`}
                  render={(field) => (
                    <div>
                      <FormItem>
                        <FormControl>
                          <input
                            disabled={true}
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
            <div className="flex w-full mt-10 items-center justify-end gap-2">
              <DrawerTrigger asChild>
                <Button
                  type="button"
                  className="bg-rose-500"
                  onClick={() => clearWorkout()}
                >
                  cancel workout
                </Button>
              </DrawerTrigger>
              <DrawerTrigger asChild>
                <Button className="bg-slate-700" type="submit">
                  finish workout
                </Button>
              </DrawerTrigger>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
