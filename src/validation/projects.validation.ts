import { object, string } from 'yup'

export const createProjectSchema = object({
  name: string().required('El campo de nombre es requerido'),
  client: string().required('El campo de nombre es requerido'),
})
