import * as pollsController from "@/app/features/polls/polls.controller";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export async function GET(req) {
  const session = await getServerSession(authOptions);
  const id = session.user.id;
  console.log(id);
  console.log(session);
  const response = await pollsController.listPolls(req, { id });
  return response;
}


export async function POST(req, res) {
  const response = await pollsController.createPoll(req, res);
  return response;
}