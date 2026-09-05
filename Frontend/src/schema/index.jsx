import * as Yup from "yup";

const signupschema = Yup.object({
  firstName: Yup.string().trim().required("FirstName is Required"),
  lastName: Yup.string().trim().required("lastName is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .trim()
    .required("Password is Required")
    .min(6, "Minimum 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const loginschema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid Email")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export { loginschema, signupschema };
