"use client";

import { useState } from "react";
import { updateEntry } from "~/server/actions/admin";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface EditEntryDialogProps {
  id: number;
  initialData: Record<string, unknown>;
}

export function EditEntryDialog({ id, initialData }: EditEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const patientCount = initialData.patientCount as string | number | undefined;
  const dailyRevenue = initialData.dailyRevenue as string | number | undefined;
  const notes = initialData.notes as string | undefined;

  async function handleSubmit(formData: FormData) {
    setIsPending(true);

    const data = {
      patientCount: formData.get("patientCount"),
      dailyRevenue: formData.get("dailyRevenue"),
      notes: formData.get("notes"),
    };

    await updateEntry(id, data);
    setIsPending(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Entry #{id}</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`patientCount-${id}`}>Patient Count</Label>
            <Input
              id={`patientCount-${id}`}
              name="patientCount"
              type="number"
              defaultValue={String(patientCount ?? "")}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`dailyRevenue-${id}`}>Daily Revenue</Label>
            <Input
              id={`dailyRevenue-${id}`}
              name="dailyRevenue"
              type="number"
              step="0.01"
              defaultValue={String(dailyRevenue ?? "")}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`notes-${id}`}>Notes</Label>
            <Input
              id={`notes-${id}`}
              name="notes"
              type="text"
              defaultValue={notes ?? ""}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
