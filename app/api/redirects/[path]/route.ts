import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }>}
) {
  try {
    const path = (await params)?.path;
    const redirectEntry = await get(path);

    return NextResponse.json(redirectEntry);
  } catch (e) {
    return NextResponse.json(e);
  };
};