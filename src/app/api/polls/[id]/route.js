import * as pollsController from "@/app/features/polls/polls.controller";

export async function GET(req, { params }) {
    const response = await pollsController.listPoll(req, { params });
    return response;
}

export async function DELETE(req, { params }) {
    const response = await pollsController.deletePoll(req, {params});
    return response;
  }