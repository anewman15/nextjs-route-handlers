import { Suspense } from 'react';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import CustomersTable from '@/app/ui/customers/table';
import { PlusIcon } from '@heroicons/react/24/outline';

export default async function Page() {

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Create Customer</span>{' '}
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>
       <Suspense fallback={<InvoicesTableSkeleton />}>
        <CustomersTable />
      </Suspense>
    </div>
  );
};
