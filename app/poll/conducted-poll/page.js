import ConductedPoll from "@/components/poll/conducted-poll/ConductedPoll";

export const metadata = {
  title: "Gjennomførte poll - Pollify",
  description: "Se resultater og detaljer fra tidligere polls på Pollify.",
};

function ConductedPollPage() {
  return (
    <div>
      <ConductedPoll />
    </div>
  );
}

export default ConductedPollPage;
