import { Stock } from '@/generated/prisma';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const count = Number(request.nextUrl.searchParams.get('count'));
    const cursor = Number(request.nextUrl.searchParams.get('cursor'));

    const stocks = await prisma.stock.findMany({
        take: count,
        skip: cursor,
    });

    return NextResponse.json<Stock[]>(stocks);
}
