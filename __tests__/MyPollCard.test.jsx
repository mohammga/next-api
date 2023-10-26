import MyPollCard from "@/components/poll/MyPollCard";
import { render, screen } from "@testing-library/react";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("MyPollCard", () => {
  const mockData = {
    id: "MyPoll123",
    title: "Best Travel Destination?",
    description: "Pick your ideal holiday destination from the provided options.",
    createdAt: "2021-12-20T00:00:00.000Z",
  };

  beforeEach(() => {
    render(<MyPollCard {...mockData} />);
  });

  it("renders MyPollCard title correctly", () => {
    expect(screen.getByText("Best Travel Destination?")).toBeInTheDocument();
  });

  it("renders MyPollCard description correctly", () => {
    expect(screen.getByText("Pick your ideal holiday destination from the provided options.")).toBeInTheDocument();
  });

  it("renders the 'Se poll' button correctly", () => {
    expect(screen.getByText("Se Poll")).toBeInTheDocument();
  });

  it("triggers poll action when 'Se poll' is clicked", () => {
    const sePollButton = screen.getByText("Se Poll");
    sePollButton.click();
    expect(mockPush).toHaveBeenCalled();
  });
});
