/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { invoices } from "@/app/lib/strapi/strapiClient";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }>}
) {
  const id = (await params).id;

  try {
    const invoice = await invoices.findOne(id);

    return NextResponse.json(invoice);
  } catch (e: any) {
    return NextResponse.json(e, { status: 500 });
  };
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const id = (await params).id;
  const formData = await request.json();

  try {
    const invoice = await invoices.update(id, formData);

    return NextResponse.json(invoice);
  } catch (e: any) {
    return NextResponse.json(e, { status: 500 });
  };
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const id = (await params).id;

  try {
    const invoice = await invoices.delete(id);

    return NextResponse.json(invoice);
  } catch (e: any) {
    return NextResponse.json(e, { status: 500 });
  };
};
