import ConductedPoll from "@/components/poll/conducted-poll/ConductedPoll";

export const metadata = {
  title: "Gjennomførte poll - Pollify",
  description: "Poll...",
};

function ConductedPollPage() {
  return (
    <div>
      <ConductedPoll/>
    </div>
  );
}

export default ConductedPollPage;
