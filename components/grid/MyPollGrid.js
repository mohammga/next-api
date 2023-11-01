"use client";

import MyPollCard from "../card/MyPollCard";

function MyPollGird({ data, title }) {
  return (
    <div className="pb-8">
      <h1 className="py-4 text-xl font-semibold">{title}</h1>
      <div className="grid gap-4 md:gap-3 lg:gap-3 xl:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((poll, index) => (
          <MyPollCard
            key={index}
            id={poll.id}
            title={poll.title}
            description={poll.description}
            createdAt={poll.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
export default MyPollGird;
