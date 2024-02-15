import * as yup from "yup";

const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%^&*(),.?":{}|<>]).{8,}$/;

export const choreSchema = yup.object().shape({
  name: yup.string().min(2).max(24).required("Required"),
  description: yup.string().min(3),
  executor_id: yup.number().required("Required"),
});

export const choreUpdateSchema = yup.object().shape({
  name: yup.string().min(2).max(24).required("Required"),
  description: yup.string().min(3),
  executor_id: yup.number().required("Required"),
  manager_id: yup.number().required("Required"),
});

export const teamSchema = yup.object().shape({
  name: yup.string().min(2).max(24).required("Required"),
  description: yup.string().min(3),
});

export const teamUpdateSchema = yup.object().shape({
  name: yup.string().min(2).max(24).required("Required"),
  description: yup.string().min(3),
  executors: yup.array().min(1).required("Required"),
  managers: yup.array().min(1).required("Required"),
});

export const userSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .max(16)
    .matches(PASSWORD_REGEX, {
      message:
        "Password need at least one: digit, uppercase letter and special symbol",
    })
    .required("Required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Required"),
  role: yup.string().oneOf(["executor", "manager"]).required("Required"),
});
