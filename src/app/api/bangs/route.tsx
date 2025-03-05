import { NextResponse } from 'next/server';
import { bangs } from '@/app/bang';

export async function GET() {
  return NextResponse.json(bangs);
}