import { NextResponse } from "next/server";
import { revenues } from "@/app/lib/strapi/strapiClient";

export async function GET() {
  try {
    const allRevenues = await revenues.find();
    return NextResponse.json(allRevenues);
  } catch (e) {
    return NextResponse.json(e);
  };
};
