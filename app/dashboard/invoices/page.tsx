import { Suspense } from "react";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { CreateInvoice, DownloadCSV } from "@/app/ui/invoices/buttons";
import InvoicesTable from "@/app/ui/invoices/table";

export default async function Page() {

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <CreateInvoice />
        <DownloadCSV />
      </div>
       <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable />
      </Suspense>
    </div>
  );
};
