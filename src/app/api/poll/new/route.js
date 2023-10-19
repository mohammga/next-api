import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { title, description, questions, authorId } = await req.json();

    const poll = await prisma.poll.create({
        data: {
            title,
            description,
            authorId,
            questions: {
                create: questions.map(question => ({
                    title: question.title,
                    options: {
                        create: question.options.map(option => ({
                            title: option.title
                        }))
                    }
                }))
            }
        },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    });
    
    return new NextResponse(
        JSON.stringify({
          poll: {
            id: poll.id,
            title: poll.title,
            description: poll.description,
            questions: poll.questions.map(question => ({
              id: question.id,
              title: question.title,
              options: question.options.map(option => ({
                id: option.id,
                title: option.title
              }))
            }))
          },
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
