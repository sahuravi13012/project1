import * as Yup from "yup";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Full Name is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  profile: Yup.mixed().required("Profile Photo is required"),
});
export default validationSchema
