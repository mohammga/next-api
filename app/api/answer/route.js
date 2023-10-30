import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { pollId, userId, answers } = await req.json();

    // Creating the ConductedPoll first
    const conductedPoll = await prisma.conductedPoll.create({
      data: {
        pollId: pollId,
        userId: userId
      }
    });

    // Now, store each answer
    for (const answer of answers) {
      await prisma.answer.create({
        data: {
          conductedPollId: conductedPoll.id,
          questionId: answer.questionId,
          optionId: answer.optionId
        }
      });
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
      }),
      {
        status: 201,
      }
    );
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
