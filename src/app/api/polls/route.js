import * as pollsController from "@/app/features/polls/polls.controller";

export async function GET(req) {
  const response = await pollsController.listPolls(req);
  return response;
}

export async function POST(req, res) {
  const response = await pollsController.createPoll(req, res);
  return response;
}

//PUT

//DELETE