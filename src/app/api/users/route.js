import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        
        if (users.length === 0) {
            return new NextResponse(
                JSON.stringify({
                    error: 'Not Found',
                }),
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(users);

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


