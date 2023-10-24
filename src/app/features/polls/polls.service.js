import * as pollsRepo from "./polls.repository";
import * as usersRepo from "../users/users.repository";

export const list = async () => {
  const polls = await pollsRepo.findMany();

  if (!polls.success) return { success: false, error: polls.error };

  return { success: true, data: polls.data };
};

export const getByUrl = async ({ id }) => {
  const poll = await pollsRepo.findUnique({ id })

  console.log(id)

  console.log(poll)

  if (!poll.success) return { success: false, error: poll.error }
  if (!poll.data)
    return {
      success: false,
      type: 'Poll.NotExist',
      error: `Poll with ${id} does not exist`,
    }

  return { success: true, data: poll.data }
}

export const create = async ({ title, description, questions, email }) => {
  // sjekker om bruker finnes for å sikre at vi
  // kan lage en releasjon mellom user og poll
  const user = await usersRepo.exist({ email })

  if (!user.success) {
    return { success: false, error: user.error }
  }

  if (!user.data) {
    return {
      success: false,
      type: 'User.NotExist',
      error: `User with ${email} does not exist`,
    }
  }

  // sender nødvendig data for å lage en feed
  const createdPoll = await pollsRepo.create({
    title,
    description,
    questions,
    userId: user.data.id,
  })

  if (!createdPoll.success) {
    return { success: false, error: createdPoll.error }
  }

  return { success: true, data: createdPoll.data }
}