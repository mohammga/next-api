import * as pollsService from "./polls.service";

export const listPolls = async (req) => {
  const polls = await pollsService.list();

  if (polls.error)
    return new Response(JSON.stringify(polls.error), { status: 500 });

  return new Response(JSON.stringify(polls));
};


export const listPoll = async (req, { params }) => {
  const id = params.id;

  const polls = await pollsService.getByUrl({ id });

  if (polls.error)
    return new Response(JSON.stringify(polls.error), { status: 500 });

  return new Response(JSON.stringify(polls));
};


export const createPoll = async (req) => {
  const { title, description, questions, email } = await req.json();

  if (!title || !description || !questions || !email)
    return new Response(JSON.stringify({
      success: false,
      error: "Missing required fields: title, description, questions, email",
    }), { status: 400 });

  const createdPoll = await pollsService.create({
    title,
    description,
    questions,
    email,
  });

  if (!createdPoll.success) {
    switch (createdPoll?.type) {
      case "Poll.Duplicate":
        return new Response(JSON.stringify({
          success: false,
          error: createdPoll.error,
        }), { status: 409 });

      case "User.NotExist":
        return new Response(JSON.stringify({
          success: false,
          error: createdPoll.error,
        }), { status: 404 });

      default:
        return new Response(JSON.stringify({
          success: false,
          error: createdPoll.error,
        }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({
    data: createdPoll.data,
    success: true,
    message: "Poll created successfully."
  }), { status: 201 });
};


//PUT

//DELETE
