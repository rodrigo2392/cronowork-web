import { object, string } from "yup";

export const createClientSchema = object({
  email: string()
    .email("Debes ingresar un email válido")
    .required("El campo de email es requerido"),
  name: string().required("El campo de nombre es requerido"),
});
