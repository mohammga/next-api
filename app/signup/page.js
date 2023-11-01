import SignupForm from "@/components/form/SignupForm";

export const metadata = {
  title: "Opprett konto - Pollify",
  description: "Opprett en ny konto på Pollify for å delta i avstemninger og få tilgang til eksklusive funksjoner.",
};

function SignupPage() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}

export default SignupPage;
