import { NextRequest, NextResponse } from "next/server";
import { invoices } from "@/app/lib/strapi/strapiClient";
import geoip from "geoip-country";

export async function GET(request: NextRequest) {
  const ip = (await request.headers.get("x-forwarded-for"))?.split(",")[0];
  let allInvoices;
  let country = "FR";

  try {
    allInvoices = await invoices.find();
    // country = (await geoip.lookup(ip as string))?.country as string;

    if (country !== "FR") {
      return NextResponse.json(allInvoices);
    }

    return NextResponse.redirect(new URL("/api/v2/invoices/fr", request.url), {
      status: 302,
    });
  } catch (e: any) {
    return NextResponse.json(e, { status: 500 });
  };
};
