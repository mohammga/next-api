import Card from "./Cards";

function CardGrid({ data, title }) {
  return (
    <div>
      <h1 className="p-4 text-xl font-semibold">
        {title}
      </h1>
      <div className="flex flex-wrap">
        {data.map((poll, index) => (
          <Card key={index} id={poll.id} title={poll.title} description={poll.description} />
        ))}
      </div>
    </div>
  );
}

export default CardGrid;