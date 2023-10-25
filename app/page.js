import LoginForm from "@/components/form/LoginForm";

export const metadata = {
  title: "Logg inn - Pollify",
  description: "Poll...",
};

function Homepage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
export default Homepage;