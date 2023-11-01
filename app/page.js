import LoginForm from "@/components/form/LoginForm";

export const metadata = {
  title: "Logg inn - Pollify",
  description: "Logg inn på Pollify for å få tilgang til din konto.",
};

function Homepage() {
  return (
    <>
      <LoginForm />
    </>
  );
}

export default Homepage;
