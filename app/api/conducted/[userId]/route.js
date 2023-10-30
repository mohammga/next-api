import * as pollsController from "@/app/features/polls/polls.controller";

export async function GET(req, { params }) {
  const response = await pollsController.listConductedPolls(req, { params });
  return response;
}
