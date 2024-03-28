import * as yup from "yup"

// export const registerSchema = yup
//   .object({
//     name: yup.string().required("name is required").min(5 , "name should be at least 5 characters"),
//     email: yup.string().required("email is required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ , "invalid email"),
//     password: yup.string().required("password is required").min(6 , "password should be at least 6 characters"),
//   })
//   .required();


  export const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    password: yup.string().required('Password is required'),
  });