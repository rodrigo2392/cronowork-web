import { object, string, ref } from "yup";

export interface loginRequest {
  email: string;
  password: string;
}

export interface registerRequest {
  email: string;
  password: string;
  name: string;
}

export const loginSchema = object({
  password: string().required("El campo de contraseña es requerido"),
  email: string()
    .email("Debes ingresar un email válido")
    .required("El campo de email es requerido"),
});

export const registerSchema = object({
  password: string().required("El campo de contraseña es requerido"),
  repeat_password: string().oneOf(
    [ref("password")],
    "Las contraseñas deben coincidir",
  ),
  email: string()
    .email("Debes ingresar un email válido")
    .required("El campo de email es requerido"),
  name: string().required("El campo de nombre es requerido"),
});
