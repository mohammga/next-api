import TatPoll from "./TatPoll";
function TatPollGrid({ data, title }) {
  return (
    <div>
      <h1 className="p-4 text-xl font-semibold">
        {title}
      </h1>
      <div className="flex flex-wrap">
        {data.map((poll, index) => (
          <TatPoll key={index} id={poll.id} title={poll.title} description={poll.description} createdAt={poll.createdAt} />
        ))}
      </div>
    </div>
  );
}
export default TatPollGrid;