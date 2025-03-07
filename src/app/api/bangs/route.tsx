import { NextResponse } from "next/server";
import { bangs } from "@/lib/bang";

export async function GET() {
  return NextResponse.json(bangs);
}
