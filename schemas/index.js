import * as Yup from "yup";

export const validationSignup = Yup.object().shape({
  name: Yup.string()
    .required("Navn er påkrevd")
    .matches(
      /^[A-Za-zÆØÅæøå]+$/,
      "Navn kan ikke inneholde tall eller spesialtegn"
    ),
  email: Yup.string()
    .required("E-postadresse er påkrevd")
    .test("has-at", "E-postadressen må inneholde @.", (value) =>
      value.includes("@")
    )
    .test(
      "valid-domain",
      "E-postadressen har en ugyldig domenedel (delen etter @)",
      (value) => {
        if (value && value.includes("@")) {
          const domainPart = value.split("@")[1];
          const domainRegEx = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return domainRegEx.test(domainPart);
        }
        return true;
      }
    )
    .matches(
      /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "E-postadressen er ugyldig."
    ),
  password: Yup.string()
    .required("Passord er påkrevd")
    .test(
      "min-length",
      "Passordet må være minst 8 tegn langt",
      (value) => value.length >= 8
    )
    .test(
      "one-lowercase",
      "Passordet må inneholde minst en liten bokstav",
      (value) => /[a-zæøå]/.test(value)
    )
    .test(
      "one-uppercase",
      "Passordet må inneholde minst en stor bokstav",
      (value) => /[A-ZÆØÅ]/.test(value)
    )
    .test("one-number", "Passordet må inneholde minst ett tall", (value) =>
      /\d/.test(value)
    ),
});

export const validationLogin = Yup.object().shape({
  email: Yup.string()
    .required("E-postadresse er påkrevd")
    .test("has-at", "E-postadressen må inneholde @.", (value) =>
      value.includes("@")
    )
    .test(
      "valid-domain",
      "E-postadressen har en ugyldig domenedel (delen etter @)",
      (value) => {
        if (value && value.includes("@")) {
          const domainPart = value.split("@")[1];
          const domainRegEx = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return domainRegEx.test(domainPart);
        }
        return true;
      }
    )
    .matches(
      /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "E-postadressen er ugyldig"
    ),
  password: Yup.string().required("Passord er påkrevd"),
});

export const validationCreatePoll = Yup.object().shape({
  title: Yup.string()
    .required("Tittel er påkrevd")
    .min(3, "Tittelen må inneholde minst 3 bokstaver")
    .max(100, "Tittelen kan inneholde maksimalt 100 tegn"), // Adjust the max length as needed

  description: Yup.string()
    .required("Beskrivelse er påkrevd")
    .min(3, "Beskrivelsen må inneholde minst 3 bokstaver")
    .max(500, "Beskrivelsen kan inneholde maksimalt 500 tegn") // Adjust the max length as needed
    // You can add more specific constraints here, such as disallowing certain characters or words, if needed.
});


export const questionValidationSchema = Yup.object().shape({
  polls: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Spørsmål er påkrevd"),
      options: Yup.array().of(
        Yup.object().shape({
          option: Yup.string().required("Svaralternativ er påkrevd"),
        })
      ),
    })
  ),
});

export const isAnyFieldEmpty = (values) => {
  let isEmpty = false;
  values.polls.forEach((question) => {
    if (!question.title || question.options.some((option) => !option.option)) {
      isEmpty = true;
    }
  });
  return isEmpty;
};