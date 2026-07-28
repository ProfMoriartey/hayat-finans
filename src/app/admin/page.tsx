import { getAllEntries } from "~/server/actions/admin";
import { EditEntryDialog } from "./_components/edit-entry-dialog";
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
    <div className="container mx-auto max-w-6xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Admin Monitoring Dashboard</h1>

      <div className="overflow-hidden rounded-lg border">
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
                <TableCell colSpan={5} className="text-center text-gray-500">
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
                    <pre className="max-w-xs overflow-x-auto text-xs">
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
