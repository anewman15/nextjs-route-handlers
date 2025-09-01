import Image from 'next/image';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { invoices } from '@/app/lib/strapi/strapiClient';
import { formatCurrency } from '@/app/lib/utils';

export default async function LatestInvoices() {
  const latestInvoices = (await invoices.find({
    populate: {
      customer: {
        fields: ["name", "email", "image_url"],
      },
    },
    sort: ["createdAt:desc"],
    pagination: {
      limit: 5,
    }
  }))?.data;

  if (!latestInvoices || latestInvoices.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  };

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {latestInvoices.map((invoice: any, i: number) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice?.customer?.image_url || "/good-raby.png"}
                    alt="avatar"
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice?.customer?.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice?.customer?.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {formatCurrency(invoice?.amount)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
