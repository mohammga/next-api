import PollifyCard from "@/components/poll/PollifyCard";
import { render, screen } from "@testing-library/react";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("PollifyCard", () => {
  const mockData = {
    id: "Pollify789",
    title: "Favorite Cuisine?",
    description: "What type of cuisine do you enjoy the most?",
    createdAt: "2022-01-25T00:00:00.000Z",
  };

  beforeEach(() => {
    render(<PollifyCard {...mockData} />);
  });

  it("renders PollifyCard title correctly", () => {
    expect(screen.getByText("Favorite Cuisine?")).toBeInTheDocument();
  });

  it("renders PollifyCard description correctly", () => {
    expect(screen.getByText("What type of cuisine do you enjoy the most?")).toBeInTheDocument();
  });

  it("renders the 'Ta poll' button correctly", () => {
    expect(screen.getByText("Ta poll")).toBeInTheDocument();
  });

  it("triggers poll action when 'Ta poll' is clicked", () => {
    const taPollButton = screen.getByText("Ta poll");
    taPollButton.click();
    expect(mockPush).toHaveBeenCalled();
  });
});
