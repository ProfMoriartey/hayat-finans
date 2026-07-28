import { getAllEntries } from "~/server/actions/admin";
import { EditEntryDialog } from "./_components/edit-entry-dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default async function AdminDashboardPage() {
  const entries = await getAllEntries();

  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Mobile Priority View: Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {entries.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No records found.</p>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-medium">
                  <span>Entry #{entry.id}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="mb-2 font-mono text-xs break-all text-gray-500">
                  User: {entry.userId}
                </p>
                <pre className="overflow-x-auto rounded-md bg-gray-50 p-2 text-xs">
                  {JSON.stringify(entry.entryData, null, 2)}
                </pre>
              </CardContent>
              <CardFooter>
                <EditEntryDialog id={entry.id} initialData={entry.entryData} />
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden overflow-hidden rounded-lg border bg-white md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-gray-500"
                >
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.id}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {entry.userId}
                  </TableCell>
                  <TableCell>
                    {new Date(entry.createdAt).toLocaleDateString()}{" "}
                    {new Date(entry.createdAt).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <pre className="max-w-xs overflow-x-auto rounded bg-gray-50 p-1 text-xs">
                      {JSON.stringify(entry.entryData, null, 2)}
                    </pre>
                  </TableCell>
                  <TableCell className="text-right">
                    <EditEntryDialog
                      id={entry.id}
                      initialData={entry.entryData}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
