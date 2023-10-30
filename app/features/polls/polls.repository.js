import { prisma } from '@/lib/prisma';

export const findMany = async ({id}) => {
  try {
    const polls = await prisma.poll.findMany({
      where: {
        authorId: {
          not: id,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
    });
    return { success: true, data: polls };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed finding polls" };
  }
};


export const findUserPolls = async (identifier) => {
  try {
    const polls = await prisma.poll.findMany({
      where: {
        ...identifier,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        authorId: true,
      },
    });
    return { success: true, data: polls };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed finding user polls" };
  }
};

export const findConductedPolls = async (identifier) => {
  try {
    const polls = await prisma.conductedPoll.findMany({
      where: {
        ...identifier,
      },
      select: {
        id: true,
        userId: true,
        poll: {
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            authorId: true,
          },
        },
      },
    });
    return { success: true, data: polls };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed finding user conducted polls" };
  }
};



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
              id: true,
                title: true,
                options: {
                    select: {
                        id: true,
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