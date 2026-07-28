"use client";

import { useState } from "react";
import { createEntry } from "~/server/actions/staff";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function EntryForm() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);

    const data = {
      patientCount: formData.get("patientCount"),
      dailyRevenue: formData.get("dailyRevenue"),
      notes: formData.get("notes"),
    };

    await createEntry(data);
    setIsPending(false);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="patientCount">Patient Count</Label>
        <Input id="patientCount" name="patientCount" type="number" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="dailyRevenue">Daily Revenue</Label>
        <Input
          id="dailyRevenue"
          name="dailyRevenue"
          type="number"
          step="0.01"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" name="notes" type="text" />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Submit Entry"}
      </Button>
    </form>
  );
}
