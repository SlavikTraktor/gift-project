import * as yup from "yup";
export const schema = yup
  .object({
    email: yup
      .string()
      .email("Email address entered incorrectly")
      .min(8, "Email must be more than 8 characters")
      .max(25, "Email must be no more than 25 characters")
      .required("This field is required"),
    name: yup
      .string()
      .min(3, "Login must be more than 3 characters")
      .max(25, "Login must be no more than 25 characters")
      .required(),
    password: yup
      .string()
      .min(8, "Password must be more than 8 characters")
      .max(25, "Email must be no more than 25 characters")
      .required("This field is required"),
    passwordAgain: yup
      .string()
      .oneOf([yup.ref("password")], "Password mismatch!")
      .required(),
  })
  .required();
