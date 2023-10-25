import * as pollsController from "@/app/features/polls/polls.controller";

export async function GET(req, { params }) {
  const response = await pollsController.listPollsByUser(req, { params });
  return response;
}
