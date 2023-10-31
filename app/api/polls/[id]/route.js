import * as pollsController from "@/app/features/polls/polls.controller";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  const response = await pollsController.listPoll(req, { params, userId });
  return response;
}