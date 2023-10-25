import { prisma } from '@/lib/prisma';

export const findMany = async () => {
  try {
    const polls = await prisma.poll.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
        },
    })
    return { success: true, data: polls }
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Failed finding polls' };
  }
}


export const create = async ({ title, description, questions, userId }) => {

try {
  const poll = await prisma.poll.create({
      data: {
          title,
          description,
          authorId: userId,
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
  
  return { success: true, data: poll }
} catch (error) {
  return { success: false, error: 'Failed creating poll' }
}
}

export const exist = async (identifier) => {
  try {
    const poll = await prisma.poll.findUnique({
      where: {
        ...identifier,
      },

    })

    return { success: true, data: poll }
  } catch (error) {
    return { success: false, error: 'Failed finding polls' }
  }
}

export const findUnique = async (identifier) => {
  try {
    const poll = await prisma.poll.findUnique({
      where: {
        ...identifier,
      },
      select: {
        id: true,
        title: true,
        description: true,
        authorId: true,
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
    })


    return { success: true, data: poll }
  } catch (error) {
    return { success: false, error: 'Failed finding poll' }
  }
}