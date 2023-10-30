import MyPoll from "@/components/poll/my-poll/MyPoll";

export const metadata = {
  title: "Mine poll - Pollify",
  description: "Poll...",
};

function MyPollPage() {
  return (
    <div>
      <MyPoll/>
    </div>
  );
}

export default MyPollPage;
