import PollifyCard from "@/components/poll/PollifyCard";
import { render, screen} from '@testing-library/react';

describe("PollifyCard", () => {
  const mockData = {
    id: "Abdllah",
    title: "Test Poll",
    description: "This is a test poll",
    createdAt: new Date(),
  };

  it("renders PollifyCard correctly", () => {
    render(<PollifyCard {...mockData} />);
    
    // Test for the presence of elements you expect in the component
    expect(screen.getByText("Test Poll")).toBeInTheDocument();
    expect(screen.getByText("This is a test poll")).toBeInTheDocument();
    expect(screen.getByText("Publisert:")).toBeInTheDocument();
    expect(screen.getByText("Ta poll")).toBeInTheDocument();
  });

  it("redirects to the poll page when the 'Ta poll' button is clicked", () => {
    const pushMock = jest.fn();
    const useRouterMock = {
      push: pushMock,
    };

    jest.mock("next/navigation", () => ({
      useRouter: () => useRouterMock,
    }));

    render(<PollifyCard {...mockData} />);

    const takePollButton = screen.getByText("Ta poll");
    takePollButton.click();

    // Verify that the router push function was called with the correct URL
    expect(pushMock).toHaveBeenCalledWith("/poll/1");
  });
});


