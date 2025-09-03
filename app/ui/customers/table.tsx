import Link from 'next/link';
import Image from 'next/image';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { DeleteCustomer } from '@/app/ui/button';
import { customers } from '@/app/lib/strapi/strapiClient';

export default async function CustomersTable() {

  const allCustomers = await customers.find({
    fields: ['name', 'email', 'image_url'],
    populate: {
      invoices: {
        fields: ['date', 'amount', 'invoice_status'],
      }
    }
  });

  const customersData = allCustomers?.data;

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {customersData?.map((customer) => (
                <div
                  key={customer?.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer?.image_url || "/good-raby.png"}
                            className="rounded-full"
                            alt="avatar"
                            width={28}
                            height={28}
                          />
                          <p>{customer?.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {customer?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Pending</p>
                      <p className="font-medium">{
                        customer?.invoices?.filter((invoice: { invoice_status: string; }) => invoice?.invoice_status === 'pending').length
                      }</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Paid</p>
                      <p className="font-medium">{
                        customer?.invoices?.filter((invoice: { invoice_status: string; }) => invoice?.invoice_status === 'paid').length
                      }</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>{customer?.invoices?.length} invoices</p>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Invoices
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Pending
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Total Paid
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3 text-center font-medium">
                    Actions
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200 text-gray-900">
                {customersData.map((customer ) => (
                  <tr key={customer.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src={customer?.image_url || "/good-raby.png"}
                          className="rounded-full"
                          alt="avatar"
                          width={28}
                          height={28}
                        />
                        <p>{customer?.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {customer?.email}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {customer?.invoices?.length}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {customer?.invoices?.filter((invoice: { invoice_status: string; }) => invoice?.invoice_status === 'pending').length
}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {customer?.invoices?.filter((invoice: { invoice_status: string; }) => invoice?.invoice_status === 'paid').length
}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/dashboard/customers/${customer?.id}`}
                          className="rounded-md border p-2 hover:bg-gray-100"
                        >
                          <EyeIcon className="w-5" />
                        </Link>
                        <Link
                          href={`/dashboard/customers/${customer?.id}/edit`}
                          className="rounded-md border p-2 hover:bg-gray-100"
                        >
                          <PencilIcon className="w-5" />
                        </Link>
                        <DeleteCustomer id={customer?.id}
                        >
                          <span className="sr-only">Delete</span>
                          <TrashIcon className="w-5 stroke-gray-50" />
                        </DeleteCustomer>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
