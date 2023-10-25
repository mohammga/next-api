import PollifyCard from "./PollifyCard";

function PollifyCardGrid({ data, title }) {
  return (
    <div id="pollify-community">
      <h1 className="py-4 text-xl font-semibold">{title}</h1>
      <div className="flex flex-wrap">
        {data.map((poll, index) => (
          <PollifyCard
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

export default PollifyCardGrid;