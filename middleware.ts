/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { has as edgeConfigHas } from "@vercel/edge-config";

export interface RedirectsEntry {
  destination: string;
  permanent: boolean;
};

export type RedirectsRecord = Record<string, RedirectsEntry>;

export async function middleware(request: NextRequest) {
  const pathname = request?.nextUrl?.pathname;
  const redirectKey = pathname?.split("/")?.join("-");

  try {
    const edgeRedirectsHasRedirectKey = await edgeConfigHas(redirectKey);

    if (edgeRedirectsHasRedirectKey) {
      const redirectApi = new URL(
        `/api/redirects/${redirectKey}`,
        request.nextUrl.origin
      );
      const redirectData = await fetch(redirectApi);

      const redirectEntry: RedirectsEntry | undefined =
        await redirectData?.json();
      const statusCode = redirectEntry?.permanent ? 308 : 307;

      return NextResponse.redirect(
        new URL(redirectEntry?.destination as string, request.nextUrl.origin),
        statusCode
      );
    }

    return NextResponse.next();
  } catch (e: any) {
    return NextResponse.json(e, { status: e.status });
  };
};

export const config = {
  matcher: ["/(api/v1/revenues*.*)"],
};
