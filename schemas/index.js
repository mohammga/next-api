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
    .max(25, "Tittelen kan inneholde maksimalt 25 tegn")
    .matches(/^[a-zA-Z0-9æøåÆØÅ]+( [a-zA-Z0-9æøåÆØÅ]+)*$/, "Tittelen kan ikke inneholde spesialtegn eller starte/slutte med mellomrom"),

  description: Yup.string()
    .required("Beskrivelse er påkrevd")
    .min(3, "Beskrivelsen må inneholde minst 3 bokstaver")
    .max(100, "Beskrivelsen kan inneholde maksimalt 100 tegn")
    .matches(/^[a-zA-Z0-9æøåÆØÅ]+( [a-zA-Z0-9æøåÆØÅ]+)*$/, "Beskrivelsen kan ikke inneholde spesialtegn eller starte/slutte med mellomrom")
});



export const questionValidationSchema = Yup.object().shape({
  polls: Yup.array().of(
    Yup.object().shape({
      title: Yup.string()
      .required("Spørsmål er påkrevd")
      .matches(/^[^\s].*[^\s]$/, "Spørsmål kan ikke starte eller slutte med mellomrom")
      .min(3, "Spørsmål må inneholde minst 3 bokstaver")
      .max(50, "Spørsmål kan inneholde maksimalt 50 tegn"),
      options: Yup.array().of(
        Yup.object().shape({
          option: Yup.string()
            .required("Svaralternativ er påkrevd")
            .matches(/^[^\s].*[^\s]$/, "Spørsmål kan ikke starte eller slutte med mellomrom")
            .min(1, "Svaralternativ må inneholde minst 1 bokstav")
            .max(50, "Svaralternativ kan inneholde maksimalt 50 tegn")
        })
      ),
    })
  ),
});
