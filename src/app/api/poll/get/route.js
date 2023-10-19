import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const pollId = searchParams.get('pollId');

        const poll = await prisma.poll.findUnique({
            where: {
                id: pollId
            },
            select: {
                id: true,
                title: true,
                description: true,
                questions: {
                    select: {
                        title: true,
                        options: {
                            select: {
                                title: true
                            }
                        }
                    }
                }
            }
        });

        if (!poll) {
            return new NextResponse(
                JSON.stringify({
                    error: 'Not Found',
                }),
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(poll);

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
