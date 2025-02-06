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

export const updatePassValidationSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(
      /[A-Z]/,
      "The password must contain at least one uppercase letter."
    )
    .matches(/[0-9]/, "The password must contain at least one number."),
  new_password: Yup.string()
    .required("The new password is required.")
    .min(6, "The password must be at least 6 characters.")
    .max(20, "The password must not exceed 20 characters.")
    .matches(
      /[A-Z]/,
      "The password must contain at least one uppercase letter."
    )
    .matches(/[0-9]/, "The password must contain at least one number."),
  new_password_confirmation: Yup.string()
    .required("Please confirm your new password.")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match."),
});

export const updateUserAccountValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(190, "The name must not exceed 190 characters.")
    .nullable(),
  email: Yup.string().email("Please provide a valid email address.").nullable(),
  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "The phone number must be valid.")
    .nullable(),
  address: Yup.string()
    .max(255, "The address must not exceed 255 characters.")
    .nullable(),
});

export const roleValidationSchema = Yup.object().shape({
  role: Yup.string()
    .required("Role is required")
    .oneOf(["admin", "user", "professor"], "Invalid role"),
});

export const createUserAccountValidationSchema = Yup.object().shape({
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
  role: Yup.string()
    .required("Role is required")
    .oneOf(["admin", "user", "professor"], "Invalid role"),
});

export const courseValidationSchema = Yup.object().shape({
  CourseName: Yup.string()
    .required("The course name field is required.")
    .max(255, "The course name must not exceed 255 characters."),
  CourseCode: Yup.string()
    .required("The course code field is required.")
    .max(10, "The course code must not exceed 10 characters.")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "The course code must contain only letters and numbers."
    ),
});

export const CreateQuizValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("The Quiz Title filed is required. ")
    .max(50, "The Quiz Title must not exceed 50 characters. "),
  description: Yup.string()
    .nullable()
    .max(150, "The Description of Quiz must not exceed 150 characters."),
  quiz_date: Yup.date().required(" The Quiz date is required."),
  start_time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:mm")
    .required("Start time is required"),
  end_time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:mm")
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { start_time } = this.parent;
        return start_time && value > start_time;
      }
    ),
});

export const UploadMaterialsValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(255, "Title must not exceed 255 characters"),
  description: Yup.string().when("material_type", {
    is: "text",
    then: (schema) =>
      schema
        .required("Description is required for text materials")
        .max(1000, "Description must be at most 1000 characters"),
    otherwise: (schema) =>
      schema.nullable().max(255, "Description must be at most 255 characters"),
  }),
  material_type: Yup.string()
    .oneOf(["pdf", "video", "text"], "Invalid material type")
    .required("Material type is required"),
  file: Yup.mixed().when("material_type", {
    is: "pdf",
    then: (schema) =>
      schema
        .required("File is required for PDF materials")
        .test(
          "fileType",
          "The file must be one of the following types: pdf, docx, txt, ppt, pptx",
          (value) => {
            if (!value || !value.name) return false;
            const allowedExtensions = ["pdf", "docx", "txt", "ppt", "pptx"];
            const fileExtension = value.name.split(".").pop().toLowerCase();
            console.log(value.type);
            return allowedExtensions.includes(fileExtension);
          }
        )
        .test(
          "fileSize",
          "File size must be less than 10MB",
          (value) => value && value.size <= 10 * 1024 * 1024
        ),
    otherwise: (schema) => schema.nullable(),
  }),
  video: Yup.mixed().when("material_type", {
    is: "video",
    then: (schema) =>
      schema
        .required("Video is required for video materials")
        .test("fileType", "The video must be in mp4 format", (value) => {
          if (!value) return false; // No file provided
          return value.type === "video/mp4";
        })
        .test(
          "fileSize",
          "Video size must be less than 10MB",
          (value) => value && value.size <= 10 * 1024 * 1024
        ),
    otherwise: (schema) => schema.nullable(),
  }),
  // course_id: Yup.number()
  //   .required("Course ID is required")
  //   .integer("Course ID must be an integer"),
});

export const updateMaterialsValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(255, "Title must not exceed 255 characters"),
  description: Yup.string().when("material_type", {
    is: "text",
    then: (schema) =>
      schema
        .required("Description is required for text materials")
        .max(1000, "Description must be at most 1000 characters"),
    otherwise: (schema) =>
      schema.nullable().max(255, "Description must be at most 255 characters"),
  }),
});
