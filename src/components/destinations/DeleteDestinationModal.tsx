"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import IDestination from "@/type/destinationsType";
import { Ban } from "lucide-react";
import { redirect } from "next/navigation";

const DeleteDestinationModal = ({
  destination,
}: {
  destination: IDestination;
}) => {
  const handleDeleteDestination = async () => {
    const res = await fetch(
      `http://localhost:8000/destination/${destination._id}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json()
    redirect("/destinations")
    
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button className="flex h-9 items-center gap-2 rounded-md border border-red-300 bg-white px-4 text-sm font-medium text-red-500 hover:bg-red-50">
              <Ban className="size-3.5" />
              Cancel
            </Button>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteDestinationModal;
