import Take from "@/components/poll/take/Take";

export const metadata = {
  title: "Ta poll - Pollify",
  description: "Delta i spennende avstemninger på Pollify og uttrykk din mening.",
};

export default function Page() {
  return (
    <div>
      <Take />
    </div>
  );
}
