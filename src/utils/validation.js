import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(
      /^[A-Z][a-zA-Z0-9]{5,}$/,
      "Password must start with an uppercase letter and contain at least 6 characters"
    ),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("The name field is required.")
    .max(190, "The name must not exceed 190 characters."),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(
      /[A-Z]/,
      "The password must contain at least one uppercase letter."
    )
    .matches(/[0-9]/, "The password must contain at least one number."),
  password_confirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Password confirmation does not match."),
  phone: Yup.string()
    .required("The phone number field is required.")
    .matches(/^01[0125][0-9]{8}$/, "The phone number must be valid."),
  address: Yup.string()
    .required("The address field is required.")
    .max(255, "The address must not exceed 255 characters."),
});

export const resetPassValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(" Email is required")
    .email("Email must be Valid"),
});

export const sendCodeValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(" Email is required")
    .email("Email must be Valid"),
  otp: Yup.string()
    .required("The token field is required.")
    .max(4, "The OTP must be 4 numbers."),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(
      /[A-Z]/,
      "The password must contain at least one uppercase letter."
    )
    .matches(/[0-9]/, "The password must contain at least one number."),
  password_confirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Password confirmation does not match."),
});
