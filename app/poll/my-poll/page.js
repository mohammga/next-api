import MyPoll from "@/components/poll/my-poll/MyPoll";

export const metadata = {
  title: "Mine poll - Pollify",
  description: "Se dine opprettede polls på Pollify.",
};

function MyPollPage() {
  return (
    <>
      <MyPoll />
    </>
  );
}

export default MyPollPage;
