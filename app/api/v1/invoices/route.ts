/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { invoices } from "@/app/lib/strapi/strapiClient";

export async function GET(request: NextRequest) {
  const ip = (await request.headers.get("x-forwarded-for"))?.split(",")[0];
  // const ip = "51.158.36.186"; // FR based ip

  let allInvoices;
  let country = "FR";

  try {
    allInvoices = await invoices.find();
    country = (await (await fetch(`http://ip-api.com/json/${ip}`)).json())?.countryCode;

    if (country !== "FR") {
      return NextResponse.json(allInvoices);
    };

    return NextResponse.redirect(new URL("/api/v2/invoices/fr", request.url), {
      status: 302,
    });
  } catch (e: any) {
    return NextResponse.json(e, { status: 500 });
  };
};
