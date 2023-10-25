import MyPollCard from "./MyPollCard";

function MyPollGird({ data, title }) {
  return (
    <div id="my-poll">
      <h1 className="p-4 text-xl font-semibold">{title}</h1>
      <div className="flex flex-wrap">
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
