import { json2csv } from "json-2-csv";
import { invoices } from "@/app/lib/strapi/strapiClient";

export async function GET() {

  const allInvoices = await invoices.find({
    populate: {
      customer: {
        fields: ["name", "email"],
      },
    },
  });

  const invoicesCSV = await json2csv(allInvoices?.data, {
    expandNestedObjects: true,
  });

  const fileBuffer = await Buffer.from(invoicesCSV as string, "utf8");

  const headers = new Headers();
  headers.append('Content-Disposition', 'attachment; filename="invoices.csv"');
  headers.append('Content-Type', "application/csv");

  return new Response(fileBuffer, {
    headers,
  });
};