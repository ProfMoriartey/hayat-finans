import { getTodayEntries } from "~/server/actions/staff";
import { EntryForm } from "./_components/entry-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default async function DashboardPage() {
  const entries = await getTodayEntries();

  return (
    <div className="container mx-auto max-w-5xl space-y-6 p-4">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <Card className="order-1 md:order-0">
          <CardHeader>
            <CardTitle>New Daily Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <EntryForm />
          </CardContent>
        </Card>

        <div className="order-2 flex flex-col gap-4 md:order-0">
          <h2 className="text-lg font-semibold">Today&apos;s Submissions</h2>

          {entries.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-gray-50 p-8 text-center">
              <p className="text-sm text-gray-500">
                No entries submitted today.
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="flex flex-col gap-3 p-4">
                  <pre className="overflow-x-auto rounded-md bg-gray-50 p-3 text-xs whitespace-pre-wrap">
                    {JSON.stringify(entry.entryData, null, 2)}
                  </pre>
                  <p className="text-[10px] font-medium tracking-wider text-gray-500 uppercase">
                    Submitted at{" "}
                    {new Date(entry.createdAt).toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
