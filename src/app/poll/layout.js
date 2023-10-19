import PollNavigation from "@/components/navigation/PollNavigation";

export default function PollLayout({children}) {
  return (
    <>
      <PollNavigation/>
      {children}
    </>
  );
}
