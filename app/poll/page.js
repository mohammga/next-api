import Pollify from "@/components/poll/pollify/Pollify";

export const metadata = {
  title: "Pollify community - Pollify",
  description: "Bli en del av Pollify-fellesskapet, opprett, delta og diskuter avstemninger."
};

function PollDashboard() {
  return (
    <>
      <Pollify />
    </>
  );
}

export default PollDashboard;
