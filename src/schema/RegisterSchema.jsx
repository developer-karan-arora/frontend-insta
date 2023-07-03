import * as Yup from "yup"

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(4)
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")],"Password should same")
    .required("Password is required"),
});

export default RegisterSchema;
