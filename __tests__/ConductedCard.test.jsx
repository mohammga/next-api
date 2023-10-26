import ConductedCard from "@/components/poll/ConductedCard";
import { render, screen } from "@testing-library/react";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ConductedCard", () => {
  const mockData = {
    id: "Conducted1",
    title: "Favorite Sport?",
    description: "Choose your preferred sport from the list below.",
    createdAt: "2022-03-15T00:00:00.000Z",
  };

  beforeEach(() => {
    render(<ConductedCard {...mockData} />);
  });

  it("renders ConductedCard title correctly", () => {
    expect(screen.getByText("Favorite Sport?")).toBeInTheDocument();
  });

  it("renders ConductedCard description correctly", () => {
    expect(screen.getByText("Choose your preferred sport from the list below.")).toBeInTheDocument();
  });
});
