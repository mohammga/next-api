"use client";

import ConductedCard from "../card/ConductedCard";

function ConductedPollGird({ data, title }) {
  return (
    <div className="pb-8">
      <h1 className="py-4 text-xl font-semibold">{title}</h1>
      <div className="grid gap-4 md:gap-3 lg:gap-3 xl:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((conductedPoll, index) => (
          <ConductedCard
            key={index}
            title={conductedPoll.poll.title}
            description={conductedPoll.poll.description}
            conductedAt={conductedPoll.conductedAt}
          />
        ))}
      </div>
    </div>
  );
}

export default ConductedPollGird;
