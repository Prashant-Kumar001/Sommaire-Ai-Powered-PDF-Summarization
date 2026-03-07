"use client";

import React from "react";
import { Button } from "../ui/button";
import { Trash2, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { deletePdf } from "@/actions/deletePdf";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        router.refresh();

        await deletePdf(id);
        router.refresh();

        console.log("Deleted:", id);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          className={cn(
            "group relative overflow-hidden rounded-lg px-3 py-1 text-sm font-medium",
            "transition-all duration-300 ease-out",
            "bg-linear-to-r from-rose-600 via-pink-600 to-rose-600",
            "hover:from-rose-500 hover:via-pink-500 hover:to-rose-500",
            "text-white shadow-md hover:shadow-lg hover:shadow-rose-500/30",
            "active:scale-95",
            "disabled:opacity-70 disabled:cursor-not-allowed",
          )}
        >
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

          <span className="relative flex items-center gap-2">
            {isPending ? <Loader2 className="animate-spin" /> : <Trash2 />}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X />
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {isPending ? <Loader2 className="animate-spin" /> : <Trash2 />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
