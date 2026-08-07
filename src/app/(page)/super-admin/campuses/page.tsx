'use client';

import Link from 'next/link';
import { useCampuses} from '@/hooks/use-campuses';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';

export default function CampusesPage() {
  const { data: campuses, isLoading, error } = useCampuses();

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
        <p className="text-muted-foreground">Loading campuses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
        <p className="text-destructive">Error loading users: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Kampus Management</h2>
          <p className="mt-1 text-on-surface-variant">
            Manage campuses in the system.
          </p>
        </div>
        <Link href="/super-admin/campuses/new" id="btn-create-campus" className={buttonVariants({ variant: 'default' })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Tambah User
        </Link>
      </div>

      <Card className="border-outline-variant bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Campus List</CardTitle>
          <CardDescription>
            View campus information and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Climate</TableHead>
                  <TableHead>Setting</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campuses && campuses.length > 0 ? (
                  campuses.map((campus) => (
                    <TableRow key={campus.id}>
                      <TableCell className="font-medium">{campus.id}</TableCell>
                      <TableCell>{campus.code}</TableCell>
                      <TableCell>{campus.climate}</TableCell>
                      <TableCell>{campus.setting}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No campuses found
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
