import { NextRequest, NextResponse } from "next/server";
import { invoices } from "@/app/lib/strapi/strapiClient";

export async function GET() {
  try {
    const allInvoices = await invoices.find();
    return NextResponse.json(allInvoices);
  } catch (e) {
    return NextResponse.json(e);
  }
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
