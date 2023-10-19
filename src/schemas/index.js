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
