import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const polls = await prisma.poll.findMany({
            select: {
                id: true,
                title: true,
                description: true,
            },
        });
        
        if (polls.length === 0) {
            return new NextResponse(
                JSON.stringify({
                    error: 'Not Found',
                }),
                {
                    status: 404,
                }
            );
        }
        return NextResponse.json(polls);
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                error: 'Internal Server Error',
                details: error.message,
            }),
            {
                status: 500,
            }
        );
    }
}
