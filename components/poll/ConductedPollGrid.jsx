import ConductedCard from "./ConductedCard";

function ConductedPollGird({ data, title }) {
  return (
    <div id="conducted-polls">
      <h1 className="p-4 text-xl font-semibold">{title}</h1>
      <div className="flex flex-wrap">
        {data.map((poll, index) => (
          <ConductedCard
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

export default ConductedPollGird;
