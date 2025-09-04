/* eslint-disable prefer-const */
import { NextRequest, NextResponse } from "next/server";
import { invoices } from "@/app/lib/strapi/strapiClient";
import geoip from "geoip-country";

export async function GET(request: NextRequest) {
  const ip = (await request.headers.get("x-forwarded-for"))?.split(",")[0];
  let country = "FR" as string;
  let allInvoices;

  try {
    allInvoices = await invoices.find();
    // country = (await geoip.lookup(ip as string))?.country as string;
  } catch (e) {

    return NextResponse.json(e);

  } finally {
    if (country !== "FR") { return NextResponse.json(allInvoices) };

    return NextResponse.redirect(new URL("/api/v2/invoices/fr", request.url), { status: 302 });
  };
};

export async function POST(request: NextRequest) {
  const formData = await request.json();

  try {
    const createdInvoice = await invoices.create(formData);
    return NextResponse.json(createdInvoice);
  } catch (e) {
    return NextResponse.json(e);
  };
};
