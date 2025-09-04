/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { exchangeRates } from "exchange-rates-api";
import { invoices } from "@/app/lib/strapi/strapiClient";

export async function GET() {
  let USDRates;
  let invoicesInUSD;
  try {
    invoicesInUSD = await invoices.find({
      fields: ["date", "amount", "invoice_status"],
      populate: {
        customer: {
          fields: ["name", "email", "image_url"],
        },
      },
    });

    // USDRates = await exchangeRates().base("USD").symbols("EUR").latest().fetch() as number;
  } catch (e) {
    return NextResponse.json(e);
  } finally {
    const USDtoEURRate = USDRates || 0.86 as number;
    const invoicesJSON = JSON.parse(JSON.stringify(invoicesInUSD?.data));

    const invoicesInEUR = invoicesJSON.map((invoice: any) => ({
      date: invoice?.date,
      amount: USDtoEURRate * invoice?.amount,
      invoice_status: invoice?.invoice_status,
      customer: invoice?.customer,
    }));

    return NextResponse.json({ data: [...invoicesInEUR] });
  };
};

