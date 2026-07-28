import { getTodayEntries } from "~/server/actions/staff";
import { EntryForm } from "./_components/entry-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default async function DashboardPage() {
  const entries = await getTodayEntries();

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Staff Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Daily Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <EntryForm />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Today's Submissions</h2>

          {entries.length === 0 ? (
            <p className="text-gray-500">No entries submitted today.</p>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-4">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(entry.entryData, null, 2)}
                  </pre>
                  <p className="mt-2 text-xs text-gray-400">
                    Submitted at {entry.createdAt.toLocaleTimeString()}
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
