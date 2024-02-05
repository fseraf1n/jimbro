import React from "react";
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
import { Button } from "../ui/button";

export default function StartWorkoutDrawer({
  isOpen,
  // setIsOpen,
}: {
  isOpen: boolean;
  // setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div>
      <Drawer open={isOpen}>
        hi
      </Drawer>
    </div>
  );
}
